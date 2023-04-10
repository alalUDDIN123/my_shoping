import React from 'react'

import SliderComponent from '../../components/SliderComponent'
import CategoriesSection from './CategoriesSection'
import DocumentTitle from '../../components/Helmet'
function Home() {
  return (
    <>
    <DocumentTitle pageTitle="Home" />
      <>
        <SliderComponent />
      </>

      <>
        <CategoriesSection />
      </>
    </>
  )
}

export default Home
