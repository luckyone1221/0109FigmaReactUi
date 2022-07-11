import React from 'react';
import Input from "../formComponents/Input";

class Banners extends React.Component {
  constructor(props) {
    super(props);
    this.updateBanners = this.updateBanners.bind(this);
    this.addBanner = this.addBanner.bind(this);

    this.state = {
      banners: [''],
    };
  }
  updateBanners(banner, index){
    let newBanners = [];
    for(let [i,banner] of Object.entries(this.state.banners)){
      newBanners[i] = banner;
    }
    newBanners[index] = banner;

    console.log(newBanners);
    this.setState({
      banners: newBanners
    });
  }
  addBanner(){
    let newBanners = [];
    for(let i=0; i < this.state.banners.length + 1; i++){
      newBanners[i] = i;
    }

    console.log(newBanners);
    this.setState({
      banners: newBanners,
    })
  }

  render() {
    const Banners = this;
    return <div className="sMain__banners section">
      <div className="container">
        {
          this.state.banners.map(function(item, i){
            return <Banner key={i} index={i} updateBanners={Banners.updateBanners}/>
          })
        }
        {/*contorl for creation banners*/}
        <div className="sMain__controll-row row gx-3 pt-3">
          <div className="col-6 col-sm-auto">
            <div className="sMain__btn sMain__btn--add r-add-btn-js" onClick={this.addBanner}>
              Add Banner
            </div>
          </div>
          <div className="col-auto">
            <div className="sMain__btn sMain__btn--export export-data-js">Export Data
            </div>
          </div>
        </div>
      </div>
    </div>;
  }
}

class Banner extends React.Component {
  constructor(props) {
    super(props);
    this.addFrame = this.addFrame.bind(this);
    this.updateFrames = this.updateFrames.bind(this);

    //frames do not reacting with <Frame/> component directly
    //but this state is updating from children
    this.state = {
      frames: [''],
    };
  }

  //at first time we replace '' in parent state frames arr
  componentDidMount(){
    this.props.updateBanners(this.state.frames, this.props.index);
  }
  //all other times we only update it
  componentDidUpdate(prevProps, prevState){
    if(this.state !== prevState){
      this.props.updateBanners(this.state.frames, this.props.index);
    }
  }

  updateFrames(frame, index){
    //create duplicate of this.state.frames but with update from child component that was changed
    let newFrames = [];
    for(let [i,frame] of Object.entries(this.state.frames)){
      newFrames[i] = frame;
    }
    newFrames[index] = frame;

    this.setState({
      frames: newFrames
    });
  }
  addFrame(){
    let newFrames = [];
    for(let i=0; i < this.state.frames.length + 1; i++){
      newFrames[i] = i;
    }

    this.setState({
      frames: newFrames,
    })
  }

  render() {
    const Banner = this;

    return <div className="sMain__banner">
      <div className="row align-items-center mb-5 gx-3">
        <div className="col">
          <div className="sMain__bann-title">
            Banner
          </div>
        </div>
        <div className="col-auto">
          <div className="sMain__round-btn sMain__round-btn--remove r-remove-item-js">

          </div>
        </div>
      </div>
      <div className="sMain__frames">
        {
          this.state.frames.map(function(item, i){
            return <Frame key={i} index={i} updateFrames={Banner.updateFrames}/>
          })
        }
      </div>
      {/**/}
      <div className="sMain__controll-row row gx-3 pt-3">
        <div className="col-6 col-sm-auto">
          <div className="sMain__btn sMain__btn--add r-add-btn-js" onClick={this.addFrame}>Add frame
          </div>
        </div>
        <div className="col-6 col-sm-auto">
          <div className="sMain__btn sMain__btn--remove r-remove-item-js">Remove Banner
          </div>
        </div>
      </div>
    </div>;
  }
}

class Frame extends React.Component {
  constructor(props) {
    super(props);
    //value={this.state.size} onChange={this.handleInputChange.bind(this)}

    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      size: "300x250",
      carType: "bmw",
      color: "white",
      reportingLabel: "BMW_Q2_I_PROJECTNAME_",
      image: "red.jpg",
      headlineTxt: "LOREM IPSUM",
      sublineTxt: "Lorem ipsum dolor",
      disclaimerTxt: "",
      ctaTxt: "",
      //date: new Date()
    };
  }

  //at first time we replace '' in parent state frames arr
  componentDidMount(){
    this.props.updateFrames(this.state, this.props.index);
  }
  //all other times we only update it
  componentDidUpdate(prevProps, prevState){
    if(this.state !== prevState){
      this.props.updateFrames(this.state, this.props.index);
    }
  }


  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return <div className="sMain__frame-wrap">
        <div className="sMain__frame">
          <div className="sMain__f-controll-row gx-2 row align-items-center">
            <div className="col">
              <div className="sMain__frame-number">
                Frame
              </div>
            </div>
            <div className="col-auto">
              <div className="sMain__round-btn sMain__round-btn--minify minify-banners-js">
                {/**/}
                <img loading="lazy" src="img/svg/chevron-down.svg" alt=""/>
              </div>
            </div>
            <div className="col-auto">
              <div className="sMain__round-btn sMain__round-btn--remove r-remove-item-js">
              </div>
            </div>
          </div>
          <div className="sMain__f-inputs frame-inputs-js">
            <div className="row gx-4 gy-3">
              <div className="col-md-4 col-lg">
                <label className="sMain__label">
                  <span className="sMain__title">size</span>
                  <input className="sMain__input form-control" type="text" name="size" value={this.state.size} onChange={this.handleInputChange}/>
                </label>
              </div>
              <div className="col-md-4 col-lg">
                <label className="sMain__label">
                  <span className="sMain__title">car type</span>
                  <select className="sMain__select form-select" name="carType" value={this.state.carType} onChange={this.handleInputChange}>
                    <option value="bmw">bmw</option>
                    <option value="bmw_i">bmw_i</option>
                    <option value="bmw_m">bmw_m</option>
                    <option value="mybmw">mybmw</option>
                    <option value="bmw_i_m">bmw_i_m</option>
                  </select>
                </label>
              </div>
              <div className="col-md-4 col-lg">
                <label className="sMain__label">
                  <span className="sMain__title">colour</span>
                  <input className="sMain__input form-control" type="text" name="color" value={this.state.color} onChange={this.handleInputChange}/>
                </label>
              </div>
              <div className="col-md-6 col-lg-4">
                <label className="sMain__label"><span className="sMain__title">alignment</span>
                  <select className="sMain__select form-select" data-key="alignment">
                    <option value="left">left</option>
                    <option value="right">right</option>
                  </select>
                </label>
              </div>
              <div className="col-md-6 col-lg-4">
                <label className="sMain__label"><span className="sMain__title">version</span>
                  <select className="sMain__select form-select" data-key="version">
                    <option value="v1">v1</option>
                    <option value="v2">v2</option>
                    <option value="v3">v3</option>
                    <option value="v4">v4</option>
                    <option value="v5">v5</option>
                    <option value="v6">v6</option>
                    <option value="v7">v7</option>
                    <option value="v8">v8</option>
                  </select>
                </label>
              </div>
              <div className="col-12 mt-0"></div>
              <div className="col-md-6 col-lg-4">
                <label className="sMain__label">
                  <span className="sMain__title">reportingLabel</span>
                  <input className="sMain__input form-control" type="text" name="reportingLabel" value={this.state.reportingLabel} onChange={this.handleInputChange}/>
                </label>
              </div>
              <div className="col-md-6 col-lg-4">
                <label className="sMain__label">
                  <span className="sMain__title">image</span>
                  <input className="sMain__input form-control" type="text" name="image" value={this.state.image} onChange={this.handleInputChange}/>
                </label>
              </div>
              <div className="col-md-6 col-lg-4">
                <label className="sMain__label">
                  <span className="sMain__title">headline_txt</span>
                  <input className="sMain__input form-control" type="text" data-key="headline_txt" name="headlineTxt" value={this.state.headlineTxt} onChange={this.handleInputChange}/>
                </label>
              </div>
              <div className="col-md-6 col-lg-4">
                <label className="sMain__label">
                  <span className="sMain__title">subline_txt</span>
                  <input className="sMain__input form-control" type="text" name="sublineTxt" value={this.state.sublineTxt} onChange={this.handleInputChange}/>
                </label>
              </div>
              <div className="col-md-6 col-lg-4">
                <label className="sMain__label">
                  <span className="sMain__title">disclaimer_txt</span>
                  <input className="sMain__input form-control" type="text" name="disclaimerTxt" value={this.state.disclaimerTxt} onChange={this.handleInputChange}/>
                </label>
              </div>
              <div className="col-md-6 col-lg-4">
                <label className="sMain__label">
                  <span className="sMain__title">cta_txt</span>
                  <input className="sMain__input form-control" type="text" name="ctaTxt" value={this.state.ctaTxt} onChange={this.handleInputChange}/>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>;
  }
}

export default Banners;