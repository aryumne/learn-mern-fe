let uid = '';
const authDataStorage = JSON.parse(localStorage.getItem('authData'));
console.log(authDataStorage)
uid = authDataStorage?.userId;
const NAVLINKS = [
    {
        id: 'home',
        path: '/',
        title: 'Home',
        type: 'hybrid',
    },
    {
        id: 'login',
        path: '/login',
        title: 'Login',
        type: 'public',
    },
    {
        id: 'register',
        path: '/register',
        title: 'Register',
        type: 'public',
    },
    {
        id: 'profile',
        path: `/profile/${uid}`,
        title: 'My Profile',
        type: 'private'
    },
    {
        id: 'my-blog',
        path: `/blogs/${uid}`,
        title: 'My Blogs',
        type: 'private'
    },
    {
        id: 'add-blog',
        path: '/add-blog',
        title: 'Add bBlog',
        type: 'private'
    }
];

export default NAVLINKS;