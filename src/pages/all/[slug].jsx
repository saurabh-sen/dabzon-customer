import React from 'react'
import { useRouter } from 'next/router'
import FooterComponents from '../../components/FooterComponents/index'
import TopSellingProducts from '../../components/LandingPageComponents/ViewAll/TopSellingProducts/index'
import AllBrands from '../../components/LandingPageComponents/ViewAll/AllBrands/index'
import AllCategories from '../../components/LandingPageComponents/ViewAll/AllCategories/index'
import NavBar from '../../components/NavBar/index'

const viewall = (slug) => {
    switch (slug) {
        case 'topSellingProducts':
            return <TopSellingProducts />;
        case 'allCategories':
            return <AllCategories />;
        case 'allBrands':
            return <AllBrands />;
        default:
            return <div>404</div>;
    }
}

const Index = () => {
    const router = useRouter()
    const { slug } = router.query;
    return (
        <div className='dynamic__route__viewall'>
            <NavBar />
            {viewall(slug)}
            <div className="footer hidden sm:block">
                <FooterComponents />
            </div>
        </div>
    )
}

export default Index