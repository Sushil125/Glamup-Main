import Navbar from "./Navbar";
import MyFooter from "./MyFooter";
import Lottie from "lottie-react";
import ContactAnimation from "../lotties/73977-contact-us.json";
// import { Container } from "postcss";

const ContactUs = () => {
  //   onNameChange(e) {
  //     this.setState({name: e.target.value})
  // };

  // onEmailChange(e) {
  //     this.setState({email: e.target.value})
  // };

  // onSubjectChange(e) {
  //     this.setState({subject: e.target.value})
  // };

  // onMsgChange(e) {this.setState({message: e.target.value})
  // },

  return (
    <div className="w-full h-screen p-10">
      <Navbar />
      <div className="col-span-2 flex flex-col justify-center items-center ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-16 h-auto w-full">
          <div className="col-span-1 bg-transparent box-border border-solid">
            <div className="justify-center items-center outline">
              <h1 className="text-2xl font-semibold justify-center text-center text-black">
                Contact <strong>Us</strong>
              </h1>
              <form
                id="contact-form"
                onSubmit={this.submitEmail.bind(this)}
                method="POST"
              >
                <div className="mt-10 mb-3 justify-center text-center text-gray-800">
                  <label className="form-label" for="exampleFormControlInput1">
                    Email address:
                  </label>
                  <br></br>
                  <input
                    type="email"
                    name="email"
                    className="form-control bg-transparent border-b  mt-10 outline"
                    placeholder="example@gmail.com"
                    aria-describedby="emailHelp"
                    required
                    value={this.state.email}
                    onChange={this.onEmailChange.bind(this)}
                  />
                </div>
                <div className="mt-10 mb-3 justify-center text-center text-gray-800 ">
                  <label className="form-label" for="exampleFormControlTextarea1">
                    Type your message:
                  </label>
                  <br></br>
                  <br></br>
                  <textarea
                    className="form-label outline"
                    id="exampleFormControlTextarea1"
                    rows="50"
                    required
                    value={this.state.message}
                    onChange={this.onMsgChange.bind(this)}
                  ></textarea>
                  <button type="submit" className="primary-btn submit">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Lottie Animation Here */}
          <div className="col-span-1 h-auto flex justify-center items-center">
            <Lottie animationData={ContactAnimation} loop autoPlay />
          </div>
        </div>
      </div>
      <MyFooter />
    </div>
  );
};
export default ContactUs;
