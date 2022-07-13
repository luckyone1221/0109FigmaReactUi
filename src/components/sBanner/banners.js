import React from 'react';
import Input from "../formComponents/Input";

/*todo
*   1. removeBanner
*   2. ExportData
*   3. fixBannerNum Css
*   4. removeMin Ball
*   5. add Alert after ExportData
*   6. make preview
* */
class Banners extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.removeFrame = this.removeFrame.bind(this);
    this.addFrame = this.addFrame.bind(this);
    this.addBanner = this.addBanner.bind(this);
    
    this.sample = {
      size: "300x250",
      carType: "bmw",
      color: "white",
      version: "v1",
      alignment: "left",
      reportingLabel: "BMW_Q2_I_PROJECTNAME_",
      image: "red.jpg",
      headlineTxt: "LOREM IPSUM",
      sublineTxt: "Lorem ipsum dolor",
      disclaimerTxt: "",
      ctaTxt: "",
    };

    this.state = {
      banners: [
        {
          frames: [
            {...this.sample},
          ],
        },
      ],
    };
  }

  //++
  addBanner(){
    let newBanners = this.state.banners;
        newBanners.push({
          frames: [
            {...this.sample}
          ],
        });

    this.setState({
      banners: newBanners,
    })
  }
  handleInputChange(event,bannerIndex,frameIndex) {
    let target = event.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    let name = target.name;

    let newBanners = this.state.banners;
    // console.log(newBanners[]);
    newBanners[bannerIndex].frames[frameIndex] = {
      ...newBanners[bannerIndex].frames[frameIndex],
      [name]: value,
    }

    this.setState({
      frames: newBanners,
    });
  }

  //++
  addFrame(bannerIndex=0){
    let newBanners = this.state.banners;

    let newFrames = newBanners[bannerIndex].frames;
        newFrames.push(newFrames[newFrames.length - 1]);

    this.setState({
      banners: newBanners,
    })
  }
  removeFrame(bannerIndex, frameIndex){
    let newBanners = this.state.banners;

    let newFrames = newBanners[bannerIndex].frames;
        newFrames.splice(frameIndex,1);

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
            return <Banner
                      key={i}
                      index={i}
                      frames={Banners.state.banners[i].frames}
                      addFrame={Banners.addFrame}
                      removeFrame={Banners.removeFrame}
                      handleInputChange={Banners.handleInputChange}
            />
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
            <div className="sMain__btn sMain__btn--export export-data-js">
              Export Data
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
    //this.state = {};
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
          <div className="sMain__round-btn sMain__round-btn--remove">
          </div>
        </div>
      </div>
      <div className="sMain__frames">
        {
          this.props.frames.map(function(item, i){
            return <Frame
                      frameParams={Banner.props.frames[i]}
                      key={i}
                      index={i}
                      //
                      bannerIndex={Banner.props.index}
                      handleInputChange={Banner.props.handleInputChange}
                      updateFrames={Banner.props.updateFrames}
                      removeFrame={Banner.props.removeFrame}
            />
          })
        }
      </div>
      {/**/}
      <div className="sMain__controll-row row gx-3 pt-3">
        <div className="col-6 col-sm-auto">
          <div className="sMain__btn sMain__btn--add" onClick={() => this.props.addFrame(this.props.index)}>Add frame
          </div>
        </div>
        <div className="col-6 col-sm-auto">
          <div className="sMain__btn sMain__btn--remove">Remove Banner
          </div>
        </div>
      </div>
    </div>;
  }
}

class Frame extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      //...this.props.defaultData
    };
  }

  render() {
    const Frame = this;
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
              <div className="sMain__round-btn sMain__round-btn--remove"
                   onClick={() => Frame.props.removeFrame(Frame.props.bannerIndex, Frame.props.index)}>
              </div>
            </div>
          </div>
          <div className="sMain__f-inputs frame-inputs-js">
            <div className="row gx-4 gy-3">
              <div className="col-md-4 col-lg">
                <label className="sMain__label">
                  <span className="sMain__title">size</span>
                  <input className="sMain__input form-control" type="text" 
                         name="size" 
                         value={this.props.frameParams.size} onChange={(e) => Frame.props.handleInputChange(e, Frame.props.bannerIndex, Frame.props.index)}
                  />
                </label>
              </div>
              <div className="col-md-4 col-lg">
                <label className="sMain__label">
                  <span className="sMain__title">car type</span>
                  <select className="sMain__select form-select" name="carType" 
                          value={this.props.frameParams.carType} 
                          onChange={(e) => Frame.props.handleInputChange(e, Frame.props.bannerIndex, Frame.props.index)}
                  >
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
                  <input className="sMain__input form-control" type="text" name="color" value={this.props.frameParams.color} onChange={(e) => Frame.props.handleInputChange(e, Frame.props.bannerIndex, Frame.props.index)}/>
                </label>
              </div>
              <div className="col-md-6 col-lg-4">
                <label className="sMain__label"><span className="sMain__title">alignment</span>
                  <select className="sMain__select form-select"
                          name="alignment"
                          value={this.props.frameParams.alignment} onChange={(e) => Frame.props.handleInputChange(e, Frame.props.bannerIndex, Frame.props.index)}
                  >
                    <option value="left">left</option>
                    <option value="right">right</option>
                  </select>
                </label>
              </div>
              <div className="col-md-6 col-lg-4">
                <label className="sMain__label">
                  <span className="sMain__title">version</span>
                  <select className="sMain__select form-select" data-key="version" name="version" value={this.props.frameParams.version} onChange={(e) => Frame.props.handleInputChange(e, Frame.props.bannerIndex, Frame.props.index)}>
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
                  <input className="sMain__input form-control" type="text" name="reportingLabel" value={this.props.frameParams.reportingLabel} onChange={(e) => Frame.props.handleInputChange(e, Frame.props.bannerIndex, Frame.props.index)}/>
                </label>
              </div>
              <div className="col-md-6 col-lg-4">
                <label className="sMain__label">
                  <span className="sMain__title">image</span>
                  <input className="sMain__input form-control" type="text" name="image" value={this.props.frameParams.image} onChange={(e) => Frame.props.handleInputChange(e, Frame.props.bannerIndex, Frame.props.index)}/>
                </label>
              </div>
              <div className="col-md-6 col-lg-4">
                <label className="sMain__label">
                  <span className="sMain__title">headline_txt</span>
                  <input className="sMain__input form-control" type="text" data-key="headline_txt" name="headlineTxt" value={this.props.frameParams.headlineTxt} onChange={(e) => Frame.props.handleInputChange(e, Frame.props.bannerIndex, Frame.props.index)}/>
                </label>
              </div>
              <div className="col-md-6 col-lg-4">
                <label className="sMain__label">
                  <span className="sMain__title">subline_txt</span>
                  <input className="sMain__input form-control" type="text" name="sublineTxt" value={this.props.frameParams.sublineTxt} onChange={(e) => Frame.props.handleInputChange(e, Frame.props.bannerIndex, Frame.props.index)}/>
                </label>
              </div>
              <div className="col-md-6 col-lg-4">
                <label className="sMain__label">
                  <span className="sMain__title">disclaimer_txt</span>
                  <input className="sMain__input form-control" type="text" name="disclaimerTxt" value={this.props.frameParams.disclaimerTxt} onChange={(e) => Frame.props.handleInputChange(e, Frame.props.bannerIndex, Frame.props.index)}/>
                </label>
              </div>
              <div className="col-md-6 col-lg-4">
                <label className="sMain__label">
                  <span className="sMain__title">cta_txt</span>
                  <input className="sMain__input form-control" type="text" name="ctaTxt" value={this.props.frameParams.ctaTxt} onChange={(e) => Frame.props.handleInputChange(e, Frame.props.bannerIndex, Frame.props.index)}/>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>;
  }
}

export default Banners;