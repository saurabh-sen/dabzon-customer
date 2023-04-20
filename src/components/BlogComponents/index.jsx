import Link from 'next/link'
import React from 'react'
import BlogSectionCard from './BlogSectionCard/index'
import blog1 from '../../../public/blog/blog1.jpg'
import { useRouter } from 'next/router'
import { createClient } from "next-sanity";

const client = createClient({
    projectId: "q21v17fe",
    dataset: "production",
    apiVersion: "2021-10-14",
    useCdn: false
});

const Index = ({ source, blogHeading, data }) => {

    const router = useRouter();

    // const [blogData, setBlogData] = React.useState([]);
    const [page, setPage] = React.useState(1);

    // React.useEffect(() => {
    //     if (source === 'home') {
    //         const QUERY = encodeURIComponent(`*[_type == "blog"][0..1]`);
    //         fetch(`https://${process.env.NEXT_PUBLIC_PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${process.env.NEXT_PUBLIC_DATASET}?query=${QUERY}`)
    //             .then((res) => res.json())
    //             .then((data) => setBlogData(data.result))
    //     } else {
    //         const QUERY = encodeURIComponent(`*[_type == "blog"] | order(_createdAt desc) [${(page - 1) * 2}...${page * 2}]`);
    //         // ($pageNumber - $currentPage) * $pageSize - 1
    //         // const { results, totalCount } = await client.fetch(
    //         //     `*[_type == "myDocumentType"] 
    //         //   );

    //         fetch(`https://${process.env.NEXT_PUBLIC_PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${process.env.NEXT_PUBLIC_DATASET}?query=${QUERY}`)
    //             .then((res) => res.json())
    //             .then((data) => setBlogData(data.result))
    //     }
    // }, [page]);

    const redirectToBlogDetailPage = (id) => {
        router.push(`/blogs/${id}`);
    }

    console.log(data)

    return (
        <div className='blog my-8'>
            <div className="blog__container max-w-7xl mx-auto px-[3vw]">

                <div className="blog__heading flex justify-between ">
                    <p className="text-gray-900 text-xl sm:text-2xl font-bold">{blogHeading}</p>
                    {source !== 'blog' && <Link href='/blogs/viewallblogs?page=1' className="text-dabgreen font-medium text-sm">view all</Link>}
                </div>

                <div className='flex justify-center items-center min-h-[70vh]'>
                    {
                        data.length > 0
                            ? <div className="blogs">
                                <div className="blog__item__container px-4 md:px-14 py-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-5 my-4 justify-between">
                                    {
                                        data.map((item, index) => <BlogSectionCard key={index} item={item} redirectToBlogDetailPage={redirectToBlogDetailPage} />)
                                    }
                                </div>
                                {source === 'blog' && <div className="blog__load__more flex justify-center">
                                    <button className="bg-dabgreen text-white px-4 py-2 rounded-md font-medium text-sm" onClick={() => setPage(prev => prev + 1)}>Load More</button>
                                </div>}
                            </div>
                            : <span>no more blogs</span>
                    }
                </div>
            </div>
        </div>
    )
}

export default Index