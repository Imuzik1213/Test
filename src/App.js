import './App.css';
import React, { useEffect, useState } from "react";
import data from './json-server/data.json';
import quan_huyen from './json-server/quan_huyen.json';
import tinh_tp from './json-server/tinh_tp.json';

function App() {

  const [selectTinh, setTinh] = useState("");

  const [selectQuan, setQuan] = useState("");

  const [selectPrice, setPrice] = useState("");

  const [selectArea, setArea] = useState("");

  const tinh_tpArr = Object.keys(tinh_tp).map(function(key) {
    return tinh_tp[key];
});

  const quanHuyenarr = Object.keys(quan_huyen).map(function(key) {
      return quan_huyen[key];
  });

  const prices = [
    ["1000000","0"],["2000000","1000000"],["3000000","2000000"],["5000000","3000000"],["7000000","5000000"],["10000000","7000000"],
  ];

  const [priceRange, setPriceRange] = useState("");
  console.log((priceRange.split(','))[0]);

  const areas = [
    ['0','20'],['20','30'],['30','50'],['50','60'],['60','70'],['70','80']
  ]

  const[areaRange, setAreaRange] = useState("")
  console.log(areaRange);
const filterData = () => {
  let findData = data; 
  let priceRangeArr = priceRange.split(',');
  let areaRangeArr = areaRange.split(',');
  if(selectTinh) {
    findData = data.filter(x => x.city === selectTinh)
  }
  if(selectQuan) {
    findData = data.filter(x => x.district === selectQuan)
  }
  if(selectPrice) {
    findData = data.filter(x => x.price >= priceRangeArr[1] && x.price < priceRangeArr[0]) 
  }
  if(selectArea) {
    findData  = data.filter(x => x.area >= areaRangeArr[0] && x.area < areaRangeArr[1])
  }
  return findData;
}

  return (
    <div className="App container-fluid">
      <div className="search">
        <div className="tinh filter">
          <p><b>Tỉnh Thành</b></p> 
          <select className='form-select'
          value={selectTinh}
          onChange={(e) => setTinh(e.target.value)}
          >
            <option value ="">-- Tỉnh thành --</option>
            {tinh_tpArr.map((tinh, idx) => {
              return(
                <option  
                key={idx}
                value={tinh.code}
                type={tinh.type}
                >
                {tinh.name}
              </option>
              )})}
          </select>
        </div>
        <div className="quanHuyen filter"> 
        <p><b>Quận Huyện</b></p>
          <select className='form-select'
            value={selectQuan}
            onChange={(e) => setQuan(e.target.value)}
            >
              <option value="">-- Quận/huyện --</option>
            {quanHuyenarr.filter(quanHuyen => quanHuyen.parent_code === selectTinh).map((filteredHuyen,idx) =>(
              <option
                key={idx}
                value={filteredHuyen.code}
              >
              {filteredHuyen.name_with_type}
              </option>
            ))}
        </select>
        </div>
        <div className="gia filter">
          <p><b>Khoảng giá</b></p> 
          <select 
          className='form-select'
          onChange={(e) => [setPrice(e.target.value), setPriceRange(e.target.value)]}
          >
            <option value="">Chọn mức giá</option>
            {prices.map((price, idx) => (
              <option
                key={idx}
                value={price}
              >
                {price[1]}đ - {price[0]}đ
              </option>
            ))}
          </select>
        </div>
        <div className="dienTich filter">
          <p><b>Diện tích</b></p> 
          <select 
          className='form-select'
          onChange={(e) => [setArea(e.target.value), setAreaRange(e.target.value)]}
          >
            <option value="">Chọn diện tích</option>
            {areas.map((area, idx) => (
              <option
                key={idx}
                value={area}
              >
                {area[0]}m2 - {area[1]}m2
              </option>       
            ))}
          </select>
        </div>
        <div>
          <div 
          className='btn btn-warning'
          // onClick={filterData}    
          >Lọc tin</div>
        </div>
  
      </div>
      <div className="search-result d-flex justify-content-center">
        <div className="info d-flex flex-column"> 
          {filterData().map((rentData, idx) => {
            return (
              <div
              key={idx} 
              className="d-flex rentData">
                <div>
                  <img width="180" height="180" src={rentData.thumbnail}></img>  
                </div>  
                <div className="rentInfo p-2">
                  <h6 className='text-danger'>{rentData.title}</h6>
                  <h5 className='text-success'>{parseInt(rentData.price)/1000000} triệu/tháng</h5>
                  <div className='d-flex'>
                    <p>Diện tích:&nbsp;<b>{rentData.area}m<sup>2</sup>&nbsp;&nbsp;&nbsp;</b></p>
                    <p>Khu vực: {rentData.district}</p>   
                  </div>
                  <p className='m-0'>{rentData.content}</p>
                </div>  
              </div>
              
            )
          })
          }    
        </div>
      </div>
    </div> 
  
  );
}

export default App;
