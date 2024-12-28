const Contact = () => {
  return (
    <section className="py-4 bg-[#FFB963] rounded-[108px] mx-56 my-8">
      <div className="container mx-auto px-4 max-w-md">
        <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
        <form className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Jiara Martins"
              className="w-full p-4 rounded-[108px]"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="hello@reallygreatsite.com"
              className="w-full p-4 rounded-[108px]"
            />
          </div>
          <div>
            <textarea
              placeholder="Write your message here"
              rows={4}
              className="w-full p-4 rounded-[48px]"
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
