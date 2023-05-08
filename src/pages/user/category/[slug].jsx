import { useRouter } from "next/router";
import { useEffect, useState } from "react"

const Index = () => {
    const router = useRouter();
    const [subcategory, setSubcategory] = useState([]);
    var category = (router.query.slug);
    useEffect(() => {
        fetch(`/api/subcategory/get-all`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "category": category,
            }),
        }).then((res) => res.json())
        .then((data) => setSubcategory(data.allData));
    }, [category])
    
    const handleSubcategory = (e,subcategory) =>{
        e.preventDefault();
        router.replace(`/user/subcategory?category=${category}&subcategory=${subcategory}`);
    }

    return (
        <div>
            {subcategory.length !==0 ? subcategory?.map((item,idx)=>(  
            <div key={idx}>
                <button onClick={(e) =>handleSubcategory(e,item.productSubcategory)}>
                    <p>{item.productSubcategory}</p>    
                </button>
            </div>
            )):
            null}
        </div>
    )
}
export default Index