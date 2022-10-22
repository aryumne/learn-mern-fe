import React, { lazy } from "react";
import Loadable from "../component/Loadable";

import { createBrowserRouter } from "react-router-dom";
const Main = Loadable(lazy(() => import('../layout/Main')));
const Profile = Loadable(lazy(() => import('../pages/profile')));
const Edit = Loadable(lazy(() => import('../pages/profile/EditProfile')));
const ListBlogs = Loadable(lazy(() => import('../pages/blogs/listblogs')));
const AddBlog = Loadable(lazy(() => import('../pages/blogs/addblog')));
const EditBlog = Loadable(lazy(() => import('../pages/blogs/editblog')));
const DetailBlog = Loadable(lazy(() => import('../pages/blogs/detailblog')));
const NotFound = Loadable(lazy(() => import('../pages/errors/NotFound')));
const Auth = Loadable(lazy(() => import('../layout/AuthLayout')));
const Login = Loadable(lazy(() => import('../pages/auth/Login')));
const Register = Loadable(lazy(() => import('../pages/auth/Register')));


const Router = createBrowserRouter([
    {
        path: '/',
        element: <Auth />,
        children: [
            {
                path: '/',
                element: <ListBlogs />
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'register',
                element: <Register />
            },
        ],
        errorElement: <NotFound />
    },
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "blogs",
                element: <ListBlogs />,
                children: [
                    {
                        path: ':uid',
                        element: <ListBlogs />
                    }
                ]
            },
            {
                path: "profile/:uid",
                element: <Profile />
            },
            {
                path: "edit-profile/:uid",
                element: <Edit />
            },
            {
                path: "add-blog",
                element: <AddBlog />
            },
            {
                path: "edit-blog/:slug",
                element: <EditBlog />
            },
            {
                path: "detail-blog/:slug",
                element: <DetailBlog />
            }
        ],
        errorElement: <NotFound />
    }
])


export default Router;


