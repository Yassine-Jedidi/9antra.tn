const Contact = () => {
  return (
    <section className="py-4 bg-[#FFB963] rounded-[108px] mx-56 my-8">
      <div className="container mx-auto px-4 max-w-md">
        <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="font-bold uppercase">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Jiara Martins"
              className="w-full p-3 rounded-[108px] mt-1"
            />
          </div>
          <div>
            <label htmlFor="email" className="font-bold uppercase">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="hello@reallygreatsite.com"
              className="w-full p-3 rounded-[108px] mt-1"
            />
          </div>
          <div>
            <label htmlFor="message" className=" font-bold uppercase">
              Message
            </label>
            <textarea
              id="message"
              placeholder="Write your message here"
              rows={3}
              className="w-full p-3 rounded-[40px] mt-1"
            />
          </div>
          <div className="flex justify-center">
            <button className="w-fit bg-[#C1316D] text-white py-2 px-12 rounded-md font-semibold hover:bg-[#A12759]">
              Send the message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
