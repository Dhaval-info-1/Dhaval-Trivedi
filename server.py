from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import json
import yaml
from pathlib import Path

app = FastAPI()

# Mount static files
app.mount("/images", StaticFiles(directory="images"), name="images")
app.mount("/styles", StaticFiles(directory="styles"), name="styles")
app.mount("/scripts", StaticFiles(directory="scripts"), name="scripts")

# Templates configuration
templates = Jinja2Templates(directory=".")

# Load blog configuration
with open('config/blog-config.json') as f:
    blog_config = json.load(f)

with open('config/blog.yml') as f:
    blog_yml = yaml.safe_load(f)

@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/blog", response_class=HTMLResponse)
async def read_blog(
    request: Request, 
    page: int = 1, 
    category: str = None, 
    search: str = None,
    tag: str = None
):
    # Filter and paginate posts
    posts = blog_config["posts"]
    posts_per_page = 9
    
    # Apply filters
    filtered_posts = posts.copy()
    if category:
        filtered_posts = {k: v for k, v in posts.items() if v["category"] == category}
    if search:
        filtered_posts = {k: v for k, v in posts.items() 
                        if search.lower() in v["title"].lower() 
                        or search.lower() in v["description"].lower()}
    if tag:
        filtered_posts = {k: v for k, v in posts.items() 
                        if tag.lower() in [t.lower() for t in v["tags"]]}
    
    # Pagination
    total_posts = len(filtered_posts)
    total_pages = (total_posts + posts_per_page - 1) // posts_per_page
    start_idx = (page - 1) * posts_per_page
    end_idx = start_idx + posts_per_page
    
    paginated_posts = dict(list(filtered_posts.items())[start_idx:end_idx])
    
    return templates.TemplateResponse(
        "blog.html", 
        {
            "request": request,
            "posts": paginated_posts,
            "categories": blog_config["categories"],
            "current_page": page,
            "total_pages": total_pages,
            "category": category,
            "search": search,
            "tag": tag,
            "blog_metadata": blog_config["blogMetadata"]
        }
    )

@app.get("/blog/{post_slug}", response_class=HTMLResponse)
async def read_post(request: Request, post_slug: str):
    # Load the specific blog post
    post = blog_config["posts"].get(post_slug)
    if not post:
        return {"error": "Post not found"}, 404
        
    return templates.TemplateResponse(
        f"blog/{post_slug}.html",
        {
            "request": request,
            "post": post,
            "blog_metadata": blog_config["blogMetadata"]
        }
    )

@app.get("/api/posts")
async def get_posts(
    category: str = None,
    search: str = None,
    tag: str = None,
    page: int = 1,
    limit: int = 9
):
    # Filter posts based on criteria
    filtered_posts = blog_config["posts"].copy()
    if category:
        filtered_posts = {k: v for k, v in filtered_posts.items() 
                        if v["category"] == category}
    if search:
        filtered_posts = {k: v for k, v in filtered_posts.items() 
                        if search.lower() in v["title"].lower() 
                        or search.lower() in v["description"].lower()}
    if tag:
        filtered_posts = {k: v for k, v in filtered_posts.items() 
                        if tag.lower() in [t.lower() for t in v["tags"]]}
    
    # Pagination
    total = len(filtered_posts)
    start = (page - 1) * limit
    end = start + limit
    
    return {
        "posts": list(filtered_posts.values())[start:end],
        "total": total,
        "page": page,
        "pages": (total + limit - 1) // limit
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
