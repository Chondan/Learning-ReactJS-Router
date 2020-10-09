import React, { useEffect, useReducer, useRef, useContext, useState } from 'react';
import { Link, Route } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { NavElem } from '../components/components';
import ContentEditable from 'react-contenteditable';

function GenerateBlogList(numberOfLists) {
    const BlogLists = Array(numberOfLists).fill(null).map((todo, index) => {
        const id = uuidv4();
        const title = `Title_${index}`;
        const content = `Content_${index}: Hello world, How are you doing?`;
        return { id, title, content };
    });
    return BlogLists;
}

function BlogList({ blogList }) {
    const blogListRef = useRef();
    function handleClick() {
        document.querySelectorAll(".blog-list").forEach(elem => elem.classList.remove("selected"));
        blogListRef.current.classList.add("selected");
    }
    return (
        <div ref={blogListRef} className="blog-list" onClick={handleClick}>
            <div style={{ fontWeight: "bold" }}>{blogList.title}</div>
            <div>{blogList.content.substring(0, 50) + "..."}</div>
        </div>
    );
}

function BlogForm({ blogLists, addNewBlogList }) {
    const titleInputRef = useRef();
    const DetailInputRef = useRef();
    function handleSubmit(e) {
        e.preventDefault();
        addNewBlogList({ id: uuidv4(), title: titleInputRef.current.value, content: DetailInputRef.current.value });
        titleInputRef.current.value = "";
        DetailInputRef.current.value = "";
    }
    return (
        <div className="blog-form">
            <form onSubmit={handleSubmit}>
                <label>Title: </label>
                <input type="text" ref={titleInputRef}/>
                <label>Details: </label>
                <textarea type="text" ref={DetailInputRef}/>
                <input type="submit" value="ADD" />
            </form>
            <div className="blog-lists">
                {blogLists.map(blogList => (
                    <Link style={{ textDecoration: "none" }} key={blogList.id} to={`/blogs/${blogList.id}`}>
                        <BlogList blogList={blogList} />
                    </Link>
                ))}
            </div>
        </div>
    );
}

function BlogDescription({ blogList, editBlog }) {
    const deleteBlogFunc = useContext(deleteBlogContext);
    const [isEditing, setIsEditing] = useState(false);
    const titleRef = useRef();
    const detailRef = useRef();
    useEffect(() => {
        if (isEditing) {
            detailRef.current.focus();
        }
    }, [isEditing]);
    function handleClickEdit() {
        setIsEditing(isEditing => !isEditing);
        editBlog({
            id: blogList.id,
            title: title,
            content: detail,
        });
    }
    const [title, setTitle] = useState(blogList.title);
    const [detail, setDetail] = useState(blogList.content);
    useEffect(() => {
        setTitle(blogList.title);
        setDetail(blogList.content);
    }, [blogList]);
    if (!blogList) {
        return false;
    }
    return (
        <div className="blog-description">
            <div className="main">
                <ContentEditable 
                    className={isEditing ? "editing" : ""}
                    innerRef={titleRef}
                    html={title}
                    disabled={!isEditing}
                    onChange={(e) => setTitle(e.target.value)}
                    tagName="h2"
                />
                <ContentEditable 
                    className={isEditing ? "editing" : ""}
                    innerRef={detailRef}
                    html={detail}
                    disabled={!isEditing}
                    onChange={(e) => setDetail(e.target.value)}
                    tagName="div"
                />
            </div>
            <div className="control">
                <button onClick={() => deleteBlogFunc(blogList.id)}>DELETE</button>
                <button onClick={handleClickEdit}>{isEditing ? "SAVE" : "EDIT"}</button>
            </div>
        </div>
    );
}

const ACTION = {
    INITIAL: "initial",
    ADD_NEW_BLOG: "add-new-blog",
    DELETE_BLOG: "delete-blog",
    EDIT_BLOG: "edit-blog",
};

const deleteBlogContext = React.createContext();
export default function Blogs() {
    const [blogLists, dispatch] = useReducer(reducer, []);
    useEffect(() => {
        dispatch({ type: ACTION.INITIAL})
    }, []);
    function reducer(blogLists, action) {
        switch (action.type) {
            case ACTION.INITIAL:
                return [...GenerateBlogList(1)]
            case ACTION.ADD_NEW_BLOG:
                return [...blogLists, action.blogObj];
            case ACTION.DELETE_BLOG:
                return blogLists.filter(blog => blog.id !== action.blogId);
            case ACTION.EDIT_BLOG:
                return blogLists.map(blog => {
                    if (blog.id !== action.editedBlogObj.id) {
                        return blog;
                    }
                    return {
                        id: action.editedBlogObj.id,
                        title: action.editedBlogObj.title,
                        content: action.editedBlogObj.content
                    }
                });
            default:
                return blogLists;
        }
    }
    function addNewBlogList(blogObj) {
        dispatch({ type: ACTION.ADD_NEW_BLOG, blogObj });        
    }
    function deleteBlog(blogId) {
        dispatch({ type: ACTION.DELETE_BLOG, blogId });
    }
    function editBlog(editedBlogObj) {
        dispatch({ type: ACTION.EDIT_BLOG, editedBlogObj });
    }
    return (
        <>
            <NavElem type="Blogs" />
            <div className="blog-main-page">
            <deleteBlogContext.Provider value={deleteBlog}>
                <BlogForm 
                    blogLists={blogLists} 
                    addNewBlogList={addNewBlogList}
                />
                <Route path="/blogs/:blogId" render={(({ match }) => <BlogDescription editBlog={editBlog} blogList={blogLists.find(blog => blog.id === match.params.blogId)} />)} />
            </deleteBlogContext.Provider>
            </div>
        </>
    );
}