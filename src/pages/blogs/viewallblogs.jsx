import React from 'react'
import NavBar from '../../components/NavBar/index'
import FooterComponents from '../../components/FooterComponents/index'
import BlogSectionCard from '../../components/BlogComponents/BlogSectionCard'
import { createClient } from 'next-sanity'
import { useRouter } from 'next/router'

const blogs = ({ data, page }) => {

    const router = useRouter();

    return (
        <div className='blogs__page'>
            <NavBar />
            <div className='blog my-8'>
                <div className="blog__container max-w-7xl mx-auto px-[3vw]">

                    <div className="blog__heading flex justify-between ">
                        <p className="text-gray-900 text-xl sm:text-2xl font-bold">All blogs</p>
                    </div>

                    <div className='flex justify-center items-center min-h-[70vh]'>
                        {
                            data.length > 0
                                ? <div className="blogs">
                                    <div className="blog__item__container px-4 md:px-14 py-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-5 my-4 justify-between">
                                        {
                                            data.map((item, index) => <BlogSectionCard key={index} item={item} />)
                                        }
                                    </div>
                                    <div className="blog__load__more flex justify-center">
                                        <button className="bg-dabgreen text-white px-4 py-2 rounded-md font-medium text-sm" onClick={() => router.replace(`/blogs/viewallblogs?page=${+page + 1}`)}>Load More</button>
                                    </div>
                                </div>
                                : <span>no more blogs</span>
                        }
                    </div>
                </div>
            </div>
            <div className="footer hidden sm:block">
                <FooterComponents />
            </div>
        </div>
    )
}

export default blogs

const client = createClient({
    projectId: "q21v17fe",
    dataset: "production",
    apiVersion: "2021-10-14",
    useCdn: false
});

export async function getServerSideProps(context) {

    const query = `*[_type == "blog"] | order(_createdAt desc) [${(+context.query.page - 1) * 2}...${+context.query.page * 2}]`;
    const blog = await client.fetch(query);

    return {
        props: {
            data: blog,
            page: context.query.page,
        },
    };
}