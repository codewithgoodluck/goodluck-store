import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useProductsContext } from "../context/products_context";
import { single_product_url as url } from "../utils/constants";
import { formatPrice } from "../utils/helpers";
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from "../components";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SingleProductPage = () => {
  const { id } = useParams();
  const history = useHistory();
  const {
    single_product_laoding:loading,
    single_product_error:error,
    single_product:product,
    fetchSingleProduct,
    
  } = useProductsContext();

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        history.push("/");
      }, 3000);
    }
  }, [error]);

  useEffect(() => {
    fetchSingleProduct(`${url}${id}`);
  }, [id]);

  
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  console.log(product)

  const {
    name,
    price,
    description,
    stock,
    stars,
    reviews,
    id: sku,
    company,
    images,
  } = product;

  return (
    <Wrapper>
      <PageHero title={name} product />
      <div className="section section-center page">
        <Link to="/products" className="btn">
          back to products
        </Link>
        <div className="product-center">
          <ProductImages images={images} ></ProductImages>
          <section className="content">
          <h2>{name}</h2>
          <Stars stars={stars} reviews={reviews}></Stars>
          <h5 className="price">{formatPrice}</h5>
          <p className="desc">{description}</p>
          <p className="info">
            <span>Avalible : </span>
            {/* if the value in stock is greater than zeero , display in stock but if its not display out off stock */}
            {stock > 0? 'In stock' : 'out of stock'}
          </p>
          <p className="info">
            <span>SKU : </span>
            {/* if the value in stock is greater than zeero , display in stock but if its not display out off stock */}
            {sku}
          </p>
          <p className="info">
            <span>Band : </span>
            {/* if the value in stock is greater than zeero , display in stock but if its not display out off stock */}
            {company}
          </p>
          <hr></hr>
          {/* if stock is greater thasn zero, display add to cart component */}
          {stock > 0 && <AddToCart product={product} />}
          </section>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default SingleProductPage;
