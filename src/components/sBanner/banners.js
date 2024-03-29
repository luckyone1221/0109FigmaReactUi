import React from 'react';
import Input from "../formComponents/Input";
import {CheсkMark, Plus, Spinner, Times} from "../other/icons";
import {Alert} from "../other/alert";

/*todo
*   1. make preview on github pages
*   2. reduce size of Input component
*   3. add option to rename banner
*   4. make banner preview frame by frame
*   3.
* */
class Banners extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.addBanner = this.addBanner.bind(this);
    this.removeBanner = this.removeBanner.bind(this);

    this.addFrame = this.addFrame.bind(this);
    this.removeFrame = this.removeFrame.bind(this);

    this.exportData = this.exportData.bind(this);

    this.showAlert = this.showAlert.bind(this);

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
      alert: {
        message: "",
        theme: ""
      },
      banners: [
        {
          frames: [
            {...this.sample},
          ],
        },
      ],
    };
  }
  //
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

  //
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
  removeBanner(bannerIndex){
    let newBanners = this.state.banners;
        newBanners.splice(bannerIndex,1);

    this.setState({
      banners: newBanners,
    })
  }

  //
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

  //export data
  replaceProps(obj, id, frame){
    let result = {};

    //left goes to Figma, right is created here, need to follow the same naming written with camelCase
    result["id"] = id;
    result["frame"] = frame;

    result["size"] = obj.size;
    result["car type"] = obj.carType;
    result["colour"] = obj.color;
    result["alignment"] = obj.alignment;
    result["version"] = obj.version;
    result["reportingLabel"] = obj.reportingLabel;
    result["image"] = obj.image;
    result["headline_txt"] = obj.headlineTxt;
    result["subline_txt"] = obj.sublineTxt;
    result["disclaimer_txt"] = obj.disclaimerTxt;
    result["disclaimer"] = obj.disclaimerTxt ? "yes" : "no";
    result["cta_txt"] = obj.ctaTxt;
    result["cta"] = obj.ctaTxt ? "yes" : "no";
    //result[""] = obj.;

    return result
  }
  getSplitter(sample){
    let splitter = {};

    for(let key in sample){
      splitter[key] = "";
    }

    return splitter
  }
  exportData(){
    let id = 1;
    let data = [];
    let splitter = this.getSplitter(this.replaceProps(this.state.banners[0].frames[0]));

    for (let banner of this.state.banners){
      let frameIndex = 1;
      for(let frame of banner.frames){
        data.push(this.replaceProps(frame, id, frameIndex))

        id++;
        frameIndex++;
      }
      data.push(splitter);
    }
    data.pop();

    navigator.clipboard.writeText(JSON.stringify(data));
    this.showAlert({
      message: 'Data was copied to clipboard',
      theme: "success",
      cleanAfter: 3,
    });
  }

  //
  showAlert(data){
    this.setState({
      ...this.state,
      alert: {
        message: data.message,
        theme: data.theme
      },
    })

    let self = this;

    if (data.cleanAfter){
      window.setTimeout(function (){

        self.setState({
          ...this.state,
          alert: {
            message: '',
            theme: ''
          },
        })
      }, data.cleanAfter * 1000);
    }
  }

  render() {
    const Banners = this;
    return <div className="sMain__banners section">
      <div className="container">
        <div className="sMain__banners">
          {
            this.state.banners.map(function(item, i){
              return <Banner
                key={i}
                index={i}
                bannersAmount={Banners.state.banners.length}
                frames={Banners.state.banners[i].frames}
                addFrame={Banners.addFrame}
                removeFrame={Banners.removeFrame}
                removeBanner={Banners.removeBanner}
                handleInputChange={Banners.handleInputChange}
              />
            })
          }
        </div>
        {/*alert*/}
          {this.state.alert.message &&
            <Alert
              alert={this.state.alert}
            />
          }
        {/*alert*/}
        {/*contorl for creation banners*/}
        <div className="sMain__controll-row row gx-3 mt-4 justify-content-center">
          <div className="col-6 col-sm-auto">
            <div className="sMain__btn sMain__btn--add-banner r-add-btn-js" onClick={this.addBanner}>
              Add Banner
            </div>
          </div>
          <div className="col-auto">
            <div
              className="sMain__btn sMain__btn--export export-data-js"
              onClick={this.exportData}
            >
              Export Data
            </div>
          </div>
        </div>
      </div>
    </div>;
  }
}

class Banner extends React.Component {
  // eslint-disable-next-line
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
          <div
            className="sMain__btn sMain__btn--add"
            onClick={() => this.props.addFrame(this.props.index)}
          >
            <Plus color="currentColor" addClasses="me-sm-3"/>
            <span className="d-none d-sm-inline">Add Frame</span>
          </div>
        </div>
        <div className="col-auto">
          <div
            className={`sMain__btn sMain__btn--remove ${this.props.bannersAmount < 2 ? "disabled" : ""}`}
            onClick={this.props.removeBanner.bind(this,this.props.index)}
          >
            <Times color="currentColor" addClasses="me-sm-3"/>
            <span className="d-none d-sm-inline">Remove Banner</span>
          </div>
        </div>
      </div>
      <div className="sMain__frames">
        {
          this.props.frames.map(function(item, i){
            return <Frame
                      frameParams={Banner.props.frames[i]}
                      framesAmount={Banner.props.frames.length}
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
              <div className={`sMain__round-btn sMain__round-btn--remove ${this.props.framesAmount < 2 ? "disabled" : ""}`}
                   onClick={() => Frame.props.removeFrame(Frame.props.bannerIndex, Frame.props.index)}>
              </div>
            </div>
          </div>
          <div className="sMain__f-inputs frame-inputs-js">
            <div className="row gx-4 gy-3">
              <Input
                data={{
                  parentClasses: 'col-md-4 col-lg',
                  addClasses: 'sMain__input',
                  htmlEl: "input",
                  labelTxt: "size",
                  type: "text",
                  name: "size",
                  index: this.props.index,
                  bannerIndex: this.props.bannerIndex,
                }}
                value={this.props.frameParams.size}
                handleInputChange={this.props.handleInputChange}
              />
              <Input
                data={{
                  parentClasses: 'col-md-4 col-lg',
                  addClasses: 'sMain__select',
                  htmlEl: "select",
                  labelTxt: "car type",
                  name: "carType",
                  index: this.props.index,
                  bannerIndex: this.props.bannerIndex,
                }}
                value={this.props.frameParams.carType}
                handleInputChange={this.props.handleInputChange}
                options={[
                  'bmw',
                  'bmw_i',
                  'bmw_m',
                  'mybmw',
                  'bmw_i_m',
                ]}
              />
              <Input
                data={{
                  parentClasses: 'col-md-4 col-lg',
                  addClasses: 'sMain__input',
                  htmlEl: "input",
                  labelTxt: "colour",
                  type: "text",
                  name: "color",
                  index: this.props.index,
                  bannerIndex: this.props.bannerIndex,
                }}
                value={this.props.frameParams.color}
                handleInputChange={this.props.handleInputChange}
              />
              <Input
                data={{
                  parentClasses: 'col-md-6 col-lg-4',
                  addClasses: 'sMain__select',
                  htmlEl: "select",
                  labelTxt: "alignment",
                  name: "alignment",
                  index: this.props.index,
                  bannerIndex: this.props.bannerIndex,
                }}
                value={this.props.frameParams.alignment}
                handleInputChange={this.props.handleInputChange}
                options={[
                  'left',
                  'right',
                ]}
              />
              <Input
                data={{
                  parentClasses: 'col-md-6 col-lg-4',
                  addClasses: 'sMain__select',
                  htmlEl: "select",
                  labelTxt: "version",
                  name: "version",
                  index: this.props.index,
                  bannerIndex: this.props.bannerIndex,
                }}
                value={this.props.frameParams.version}
                handleInputChange={this.props.handleInputChange}
                options={[
                  'v1',
                  'v2',
                  'v3',
                  'v4',
                  'v5',
                  'v6',
                  'v7',
                  'v8',
                ]}
              />
              <div className="col-12 mt-0"></div>
              <Input
                data={{
                  parentClasses: 'col-md-6 col-lg-4',
                  addClasses: 'sMain__input',
                  htmlEl: "input",
                  labelTxt: "reportingLabel",
                  type: "text",
                  name: "reportingLabel",
                  index: this.props.index,
                  bannerIndex: this.props.bannerIndex,
                }}
                value={this.props.frameParams.reportingLabel}
                handleInputChange={this.props.handleInputChange}
              />
              <Input
                data={{
                  parentClasses: 'col-md-6 col-lg-4',
                  addClasses: 'sMain__input',
                  htmlEl: "input",
                  labelTxt: "image",
                  type: "text",
                  name: "image",
                  index: this.props.index,
                  bannerIndex: this.props.bannerIndex,
                }}
                value={this.props.frameParams.image}
                handleInputChange={this.props.handleInputChange}
              />
              <Input
                data={{
                  parentClasses: 'col-md-6 col-lg-4',
                  addClasses: 'sMain__input',
                  htmlEl: "input",
                  labelTxt: "headline_txt",
                  type: "text",
                  name: "headlineTxt",
                  index: this.props.index,
                  bannerIndex: this.props.bannerIndex,
                }}
                value={this.props.frameParams.headlineTxt}
                handleInputChange={this.props.handleInputChange}
              />
              <Input
                data={{
                  parentClasses: 'col-md-6 col-lg-4',
                  addClasses: 'sMain__input',
                  htmlEl: "input",
                  labelTxt: "subline_txt",
                  type: "text",
                  name: "sublineTxt",
                  index: this.props.index,
                  bannerIndex: this.props.bannerIndex,
                }}
                value={this.props.frameParams.sublineTxt}
                handleInputChange={this.props.handleInputChange}
              />
              <Input
                data={{
                  parentClasses: 'col-md-6 col-lg-4',
                  addClasses: 'sMain__input',
                  htmlEl: "input",
                  labelTxt: "disclaimer_txt",
                  type: "text",
                  name: "disclaimerTxt",
                  index: this.props.index,
                  bannerIndex: this.props.bannerIndex,
                }}
                value={this.props.frameParams.disclaimerTxt}
                handleInputChange={this.props.handleInputChange}
              />
              <Input
                data={{
                  parentClasses: 'col-md-6 col-lg-4',
                  addClasses: 'sMain__input',
                  htmlEl: "input",
                  labelTxt: "cta_txt",
                  type: "text",
                  name: "ctaTxt",
                  index: this.props.index,
                  bannerIndex: this.props.bannerIndex,
                }}
                value={this.props.frameParams.ctaTxt}
                handleInputChange={this.props.handleInputChange}
              />
            </div>
          </div>
        </div>
      </div>;
  }
}

export default Banners;