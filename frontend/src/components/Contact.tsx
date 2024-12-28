const Contact = () => {
  return (
    <section className="py-4 bg-[#FFB963] rounded-[40px] md:rounded-[108px] mx-4 md:mx-16 lg:mx-56 my-8">
      <div className="container mx-auto px-4 w-full max-w-md">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8">
          Contact Us
        </h2>
        <form className="space-y-4 md:space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block font-bold uppercase text-sm md:text-base mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Jiara Martins"
              className="w-full p-2 md:p-3 rounded-[30px] md:rounded-[108px] mt-1 text-sm md:text-base"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block font-bold uppercase text-sm md:text-base mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="hello@reallygreatsite.com"
              className="w-full p-2 md:p-3 rounded-[30px] md:rounded-[108px] mt-1 text-sm md:text-base"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block font-bold uppercase text-sm md:text-base mb-1"
            >
              Message
            </label>
            <textarea
              id="message"
              placeholder="Write your message here"
              rows={3}
              className="w-full p-2 md:p-3 rounded-[20px] md:rounded-[40px] mt-1 text-sm md:text-base resize-none"
            />
          </div>
          <div className="flex justify-center pt-2 md:pt-4">
            <button className="w-fit bg-[#C1316D] text-white py-2 md:py-2.5 px-8 md:px-12 rounded-md text-sm md:text-base font-semibold hover:bg-[#A12759] transition-colors duration-300">
              Send the message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
