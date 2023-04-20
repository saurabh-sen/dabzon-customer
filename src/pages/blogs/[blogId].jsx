import React from 'react'
import { createClient } from 'next-sanity';
import { useRouter } from 'next/router';
import BlogDetailsPage from '../../components/BlogComponents/BlogDetailsPage/index'

const BlogDetails = ({blog, data}) => {
  const [item, setItem] = React.useState({});
  React.useEffect(() => {
    setItem(blog);
  }, []);

  // console.log(item)

  return (
    <div className='BlogDetails '>
      <BlogDetailsPage item={item} data={data} />
    </div>
  )
}

export default BlogDetails

const client = createClient({
  projectId: "icb5plbz",
  dataset: "production",
  apiVersion: "2021-10-14",
  useCdn: false
});

export async function getServerSideProps(context) {
  const { blogId } = context.query;
  const query = `*[_type == "blog" && _id == "${blogId}"]`;
  const blog = await client.fetch(query);

  const newquery = `*[_type == "blog"][0..1]`;
  const data = await client.fetch(newquery);

  return {
    props: {
      blog: blog[0],
      data: data,
    },
  };
}