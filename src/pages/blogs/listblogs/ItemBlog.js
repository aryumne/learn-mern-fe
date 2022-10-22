import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MomentLL from '../../../component/MomentLL';


export default function ItemBlog(props) {
    const { blog } = props;
    return (
        <Card>
            <CardMedia
                component="img"
                height="230"
                image="https://picsum.photos/1920/1080"
                alt="green iguana"
            />
            <CardContent>
                <Typography variant="h6" component="div">
                    {blog.title}
                </Typography>
                <Typography gutterBottom variant="subtitle1" fontStyle='italic' color='secondary.text'>
                    {MomentLL(blog.created_at)}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" href={`detail-blog/${blog.slug}`}>Read more..</Button>
                <Button size="small" href={`edit-blog/${blog.slug}`}>Edit</Button>
            </CardActions>
        </Card >
    );
}