import NavBar from "@/src/components/NavBar";
import FooterComponents from "../../../components/FooterComponents"
import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import Link from "next/link";

const Index = () => {
    const router = useRouter();
    const [subcategory, setSubcategory] = useState([]);
    let category = router.query.slug;

    useEffect(() => {
        if (category) {
            fetch(`/api/subcategory/get-all`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "category": category.toLocaleLowerCase(),
                }),
            }).then((res) => res.json()).then((data) => {
                setSubcategory(data.allData)
            }).catch((err) => {
                console.log(err)
            })
        }

    }, [category])

    return (
        <div className="category__page ">
            <NavBar />
            <div className='category__container max-w-7xl mx-auto px-[4vw] my-3 min-h-[50vh]'>
                <p className="category__heading text-xl font-semibold text-gray-900">Sub Categories - {category}</p>
                <div className="category__container my-4">
                    {/* create a unordered list of subcategories */}
                    <ul className="category__list list-disc">
                        {
                            subcategory.length > 0 ?
                                subcategory.map((item, idx) => {
                                    return (
                                        <li key={idx} className="category__list-item">
                                            <Link href={`/user/subcategory?category=${category}&subcategory=${item.productSubcategory}`} className="category__list-link">{item.productSubcategory}</Link>
                                        </li>
                                    )
                                })
                                :
                                <p className="category">No data found</p>
                        }
                    </ul>
                </div>
            </div>

            {/* recommend for you section */}
            {/* <TopSellingBatteries title="Recommeded for you" /> */}
            <div className="footer hidden sm:block">
                <FooterComponents />
            </div>
        </div>
    )
}
export default Index