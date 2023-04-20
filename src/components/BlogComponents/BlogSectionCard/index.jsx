import Image from 'next/image'
import React from 'react'
import date from "../../../../public/icons/date.svg"
import account_circle from "../../../../public/icons/account_circle.svg"
import PortableText from 'react-portable-text'
import imageUrlBuilder from '@sanity/image-url'
import { createClient } from 'next-sanity'
import { useRouter } from 'next/router'

const Index = ({ item }) => {

    const router = useRouter();

    const client = createClient({
        projectId: "icb5plbz",
        apiVersion: "2021-10-14",
        dataset: "production",
        useCdn: false
    });

    const builder = imageUrlBuilder(client);

    const [content, setContent] = React.useState([]);
    React.useEffect(() => {
        setContent(item?.content?.slice(0, 2));
    }, []);

    return (
        <div className="blogSectionCard rounded-md overflow-hidden shadow-sm cursor-pointer" onClick={() => router.replace(`/blogs/${item._id}`)} >
            <div className='blogSectionCard__image__container w-full'>
                <Image width={1000} height={1000} className="w-full" src={builder.image(item.image).width(1000).url()} alt="img" />
            </div>
            <div className='blogSectionCard__buttons '>
                {item.tags.map((tag, index) =>
                    <span key={index} type="button" className="inline-block rounded-full bg-[#6366f1] sm:ml-4 px-6 mr-4 mt-4 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white ">
                        {tag}
                    </span>
                )}
            </div>
            <div className="blogSectionCard__text px-6 py-4">
                <div className="font-bold text-base md:text-xl mb-2 truncate">{item.title}</div>
                <p className="text-gray-700 text-xs md:text-sm">
                    {
                        content.length > 0
                            ? <PortableText content={content} serializers={{
                                span: (props) => <span {...props} />,
                                span: ({ children }) => <span className="special-list-item">{children}</span>,
                            }}
                            />
                            : null
                    }
                </p>
            </div>
            <div className="blogSectionCard__date__author px-6 pt-4 pb-2 flex gap-3">
                <div className=" bg-black rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2 flex gap-2 items-center">
                    <span className="icon">
                        <Image src={date} alt="data" width={16} height={16} />
                    </span>
                    <span className="text">{item._createdAt.slice(0, 10)}</span>
                </div>
                <span className=" bg-black rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2 flex gap-2 items-center">
                    <span className="icon">
                        <Image src={account_circle} alt="data" width={16} height={16} />
                    </span>
                    <span className="text">{item.author}</span>

                </span>
            </div>
        </div>
    )
}

export default Index