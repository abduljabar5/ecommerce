'use client';
import React, { useEffect, useState } from 'react';
import { Input, Textarea, Button, Select, Option } from "@material-tailwind/react";
import { useSession } from 'next-auth/react';

const ProductFormSkel = ({ handleOpen }) => {
  const [category, setCategory] = useState('');
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrls, setImageUrls] = useState(['']);
  const [description, setDescription] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [products, setProducts] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const { data: session } = useSession();
  const handleChange = (e) => {
    setCategory(e);
  }
  const handleImageUrlChange = (index, newValue) => {
    setImageUrls(prevUrls => prevUrls.map((url, i) => i === index ? newValue : url));
  };

  const addImageUrlField = () => {
    setImageUrls(prevUrls => [...prevUrls, '']);
  };

  const removeImageUrlField = (index) => {
    setImageUrls(prevUrls => prevUrls.filter((_, i) => i !== index));
  };

  const handleSubmitOne = (e) => {
    const discountedPrice =
    Number(salePrice) > 0 ?
            (Number(price) - (Number(price) * Number(salePrice) / 100)).toFixed(2) :
            null;
    e.preventDefault();
    setProducts({
      userId: session.user.id,
      category,
      productName,
      price: Number(price),
      discountedPrice,
      imageUrls,
      description,
      salePrice: Number(salePrice)
    });
  };

  const createProduct = async () => {

    setSubmitting(true);
    try {
      const response = await fetch('/api/product/new', {
        method: 'POST',
        body: JSON.stringify({
          products
        })
      });
      if (response.ok) {
        handleOpen(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  }

  useEffect(() => {
    console.log("products:", products);
    if (products.productName) {
      createProduct();
    }
  }, [products]);

  return (
    <div className='bg-white w-2/3 md:w-3/5 lg:w-1/2 xl:w-1/2 mx-auto py-6 rounded-2xl'>
      <h2 className="text-2xl mb-4 text-center">Add Product</h2>
      <form onSubmit={handleSubmitOne} className="w-1/2 mx-auto">
        <div className='mb-4'>
          <Select
            variant="outlined"
            label="Category"
            value={category}
            onChange={handleChange}
          >
            <Option value='Shirts'>Shirt</Option>
            <Option value='Pants'>Pants</Option>
            <Option value="Shoes">Shoes</Option>
            <Option value="Accessories">Accessories</Option>
            <Option value="Sports">Sports</Option>
          </Select>
        </div>
        <div className="mb-4">
          <Input
            type="text"
            color="lightBlue"
            size="regular"
            outline={true}
            placeholder="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            fullwidth
          />
        </div>
        <div className="mb-4">
          <Input
            type="text"
            color="lightBlue"
            size="regular"
            outline={true}
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            fullwidth
          />
        </div>
        {
          imageUrls.map((url, index) => (
            <div key={index} className="mb-4 flex flex-col lg:flex-row">
              <Input
                type="text"
                color="lightBlue"
                size="regular"
                outline={true}
                placeholder={`Image URL ${index + 1}`}
                value={url}
                onChange={(e) => handleImageUrlChange(index, e.target.value)}
                fullwidth
              />
              <Button
                color="red"
                buttonType="link"
                size="regular"
                rounded={false}
                block={false}
                iconOnly={false}
                ripple="light"
                onClick={() => removeImageUrlField(index)}
              >
                Remove
              </Button>
            </div>
          ))
        }
        <Button
          color="lightBlue"
          buttonType="link"
          className='mb-4'
          size="regular"
          rounded={false}
          block={false}
          iconOnly={false}
          ripple="light"
          onClick={addImageUrlField}
        >
          Add another image
        </Button>

        <div className="mb-4">
          <Textarea
            color="lightBlue"
            size="regular"
            outline={true}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullwidth
          />
        </div>
        <div className="mb-4">
          <Input
            type="text"
            color="lightBlue"
            size="regular"
            outline={true}
            placeholder="Sale Price (Optional)"
            value={salePrice}
            onChange={(e) => setSalePrice(e.target.value)}
            fullwidth
          />
        </div>

        <div className="flex justify-end mt-6 gap-2">
          <Button className='btn btn-outline-primary bg-transparent hover:bg-red-100 text-black shadow-none hover:shadow-xl'
            onClick={handleOpen}
          >Close</Button>
          <Button
            color="lightBlue"
            buttonType="filled"
            size="regular"
            rounded={false}
            block={false}
            iconOnly={false}
            ripple="light"
            type="submit"
            disabled={submitting}
            onClick={handleOpen}
          >
            {submitting ? "Submitting" : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ProductFormSkel