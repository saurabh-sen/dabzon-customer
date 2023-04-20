import React from 'react'
import NavBar from '../../components/NavBar/index'
import FooterComponents from '../../components/FooterComponents/index'
import { useRouter } from 'next/router';
import Productdetailsview from '../../components/ProductComponents/index';

const ProductDetailsPage = () => {

  const router = useRouter();
  const { productId } = router.query;

  return (
    <div className='ProductDetailsPage'>
      <NavBar />
      <Productdetailsview productId={productId} />
      {/* <TopSellingBatteries title="Recommended for you" /> */}
      <div className="footer hidden sm:block">
        <FooterComponents />
      </div>
    </div>
  )
}

export default ProductDetailsPage