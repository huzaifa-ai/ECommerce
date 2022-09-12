import { Menu, Slider, Checkbox, Radio } from 'antd';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../Components/cards/ProductCard';
import { GetProducts } from '../functions/product';
import { FetchProductsFiltering } from '../functions/product';
import { DollarOutlined, DownSquareOutlined } from '@ant-design/icons';
import { getCategories } from '../functions/category';
import { SubCategories } from '../functions/sub';

const { SubMenu, ItemGroup } = Menu;

function Shop() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [sub, setSub] = useState([]);
  const [Categories, setCategories] = useState([]);
  const [categoriesId, setCategoriesId] = useState([]);
  const [shippings, setSHippings] = useState(['Yes', 'No']);
  const [shipping, setShipping] = useState('');
  const [brands, setBrands] = useState([
    'Apple',
    'Sumsung',
    'Microsoft',
    'Lenovo',
    'ASUS',
  ]);
  const [colors, setColors] = useState([
    'Black',
    'Brown',
    'Silver',
    'White',
    'Blue',
  ]);
  const [color, setColor] = useState('');

  const [brand, setbrand] = useState('');
  const [subId, setSubId] = useState([]);
  const [Loading, setLoading] = useState(false);
  const { search } = useSelector((state) => ({ ...state }));
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);
  const { text } = search;
  useEffect(() => {
    setLoading(true);
    LoadAllProducts();
    //fetch Categories
    getCategories()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => console.log(err));

    // Fetching SubCategories
    SubCategories()
      .then((res) => {
        setSub(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Filtering on Query

  useEffect(() => {
    const delayed = setTimeout(() => {
      FetchProductsFiltering({ query: text })
        .then((res) => {
          setProducts(res.data);
        })
        .catch((err) => console.log(err));
    }, 300);
    return () => clearTimeout(delayed);
  }, [text]);

  // Filtering on Price Range

  useEffect(() => {
    FetchProductsFiltering({ price: price })
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ok]);

  // Loading All Products
  const LoadAllProducts = () => {
    GetProducts(15)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const handleSlider = (value) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setPrice(value);
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  // Show Categories in a list of checkboxes

  const showCategories = () => {
    return Categories.map((c) => {
      return (
        <div>
          <Checkbox
            className="pb-2 px-4"
            value={c._id}
            name="category"
            onChange={handleCheck}
          >
            {c.name}
          </Checkbox>
        </div>
      );
    });
  };

  const handleCheck = (e) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setSubId([]);
    setPrice([0, 0]);
    setbrand('');
    let intheState = [...categoriesId];
    let JustChecked = e.target.value;
    let FoundintheState = intheState.indexOf(JustChecked);

    if (FoundintheState === -1) {
      intheState.push(JustChecked);
    } else {
      intheState.splice(FoundintheState);
    }
    setCategoriesId(intheState);
    FetchProductsFiltering({ category: intheState }).then((res) => {
      setProducts(res.data);
    });
  };

  // Show Sub Categories in a Sub List

  const ShowSubCategories = () => {
    return sub.map((s) => {
      return (
        <div>
          <Checkbox
            className="pb-2 px-4"
            value={s._id}
            name="sub"
            onChange={handleSubCheck}
          >
            {s.name}
          </Checkbox>
        </div>
      );
    });
  };

  const handleSubCheck = (e) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });

    setCategoriesId([]);
    setPrice([0, 0]);
    setbrand('');
    setColor('');
    let SubState = [...subId];
    let justChecked = e.target.value;

    let FoundInState = SubState.indexOf(justChecked);
    if (FoundInState === -1) {
      SubState.push(justChecked);
    } else {
      SubState.splice(FoundInState);
    }
    setSubId(SubState);
    FetchProductsFiltering({ sub: SubState }).then((res) => {
      setProducts(res.data);
    });
  };

  /* Show Brands*/

  const ShowBrand = () => {
    return brands.map((b) => {
      return (
        <div>
          <Radio
            value={b}
            name="brand"
            onChange={handleBrand}
            className="pb-2 px-4"
            checked={b === brand}
          >
            {b}
          </Radio>
        </div>
      );
    });
  };

  const handleBrand = (e) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setColor('');
    setCategoriesId([]);
    setPrice([0, 0]);
    setSubId([]);

    setbrand(e.target.value);

    FetchProductsFiltering({ brand: e.target.value }).then((res) =>
      setProducts(res.data)
    );
  };

  /* Show Colors */

  const showColor = () => {
    return colors.map((c) => {
      return (
        <div>
          <Radio
            value={c}
            name="color"
            className="pb-2 px-4"
            onChange={handleColor}
            checked={c === color}
          >
            {c}
          </Radio>
        </div>
      );
    });
  };

  const handleColor = (e) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });

    setCategoriesId([]);
    setPrice([0, 0]);
    setSubId([]);
    setbrand('');
    setColor(e.target.value);
    FetchProductsFiltering({ color: e.target.value }).then((res) =>
      setProducts(res.data)
    );
  };

  /* Show Shipping */
  const showShipping = () => {
    return shippings.map((s) => {
      return (
        <div>
          <Radio
            value={s}
            name="shipping"
            className="pb-2 px-4"
            onChange={handleShipping}
            checked={s === shipping}
          >
            {s}
          </Radio>
        </div>
      );
    });
  };

  const handleShipping = (e) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });

    setCategoriesId([]);
    setPrice([0, 0]);
    setSubId([]);
    setbrand('');
    setColor('');

    setShipping(e.target.value);

    FetchProductsFiltering({ shipping: e.target.value }).then((res) =>
      setProducts(res.data)
    );
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 col-12">
          <h4 className="pt-2 text-center">Filter</h4>
          <hr />
          <Menu defaultOpenKeys={['1', '2', '3', '4', '5', '6']} mode="inline">
            <SubMenu key="1" title={<span>Price</span>}>
              <div className="">
                <Slider
                  className="ms-4 me-4"
                  tipFormatter={(v) => `$${v}`}
                  range
                  value={price}
                  onChange={handleSlider}
                  max="4999"
                />
              </div>
            </SubMenu>
            {/* Category */}
            <SubMenu key="2" title={<span>Categories</span>}>
              <div className="">{showCategories()}</div>
            </SubMenu>
            {/* Sub Category */}
            <SubMenu key="3" title={<span>Sub Categories</span>}>
              <div className="">{ShowSubCategories()}</div>
            </SubMenu>
            {/*Brands*/}
            <SubMenu key="4" title={<span>Brands</span>}>
              <div className="">{ShowBrand()}</div>
            </SubMenu>
            {/*Color*/}
            <SubMenu key="5" title={<span>Color</span>}>
              <div className="">{showColor()}</div>
            </SubMenu>
            {/*Shipping*/}
            <SubMenu key="6" title={<span>Shipping</span>}>
              <div className="">{showShipping()}</div>
            </SubMenu>
          </Menu>
        </div>
        <div className="col-md-9 pt-2 col-12">
          {Loading ? (
            <h4 className="text-center">Loading</h4>
          ) : (
            <h4 className="text-center py-4 text-danger display-6">Products</h4>
          )}
          {products.length < 1 ? (
            <p>No Products found</p>
          ) : (
            <>
              <div className="row">
                {products.map((p) => {
                  return (
                    <div key={p._id} className="col-md-4 mt-3">
                      <ProductCard product={p} />
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Shop;
