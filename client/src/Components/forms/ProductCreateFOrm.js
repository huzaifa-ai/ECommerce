import React from 'react';

function ProductCreateFOrm({ handleChange, handleSubmit, values }) {
  const {
    title,
    description,
    price,
    category,
    subs,
    shipping,
    quantity,
    categories,
    images,
    colors,
    brands,
    color,
    brand,
  } = values;
  return (
    <form action="" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="">Title</label>

        <input
          type="text"
          name="title"
          id=""
          value={title}
          className="form-control"
          onChange={handleChange}
        />
        <div className="form-group">
          <label htmlFor="">Description</label>
          <input
            type="text"
            name="description"
            id=""
            value={description}
            className="form-control"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Price</label>
          <input
            type="number"
            name="price"
            id=""
            value={price}
            className="form-control"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Shipping</label>
          <select
            name="shipping"
            id=""
            className="form-control"
            onChange={handleChange}
          >
            <option>Select One</option>

            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="">Quantity</label>
          <input
            type="number"
            name="quantity"
            id=""
            value={quantity}
            className="form-control"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Colors</label>

          <select
            name="color"
            id=""
            className="form-control"
            onChange={handleChange}
          >
            <option>Select One</option>
            {colors.map((c, index) => {
              return (
                <option value={c} key={index}>
                  {c}
                </option>
              );
            })}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="">Brands</label>
          <select
            name="brand"
            id=""
            className="form-control"
            onChange={handleChange}
          >
            <option>Select One</option>
            {brands.map((b, index) => {
              return (
                <option value={b} key={index}>
                  {b}
                </option>
              );
            })}
          </select>
        </div>
        <br />
        <button className="btn btn-outline-info ">Submit</button>
      </div>
    </form>
  );
}

export default ProductCreateFOrm;
