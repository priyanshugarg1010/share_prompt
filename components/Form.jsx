import React from "react";
import Link from "next/link";

const Form = ({ type, post, setPost, submit, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world, and let your
        imagination run wild with all AI-powered platform.
      </p>
      <form
        className="mt-20 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
        onSubmit={handleSubmit}
      >
        <label>
          <span className="font-satoshi font-semibold text-gray-700">
            Your AI prompt
          </span>
          <textarea
            value={post.prompt}
            onChange={(e) => {
              setPost({ ...post, prompt: e.target.value });
            }}
            required
            placeholder="Write your prompt here..."
            className="form_textarea"
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-gray-700">
            Tag{` `}
            <span className="font-normal">
              (#idea, #product, #webdevelopement)
            </span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => {
              setPost({ ...post, tag: e.target.value });
            }}
            required
            placeholder="#tag"
            className="form_input"
          />
        </label>
        <div className="flex-end mb-5 gap-4 mx-3">
          <Link href="/" className="text-sm text-gray-500">
            cancel
          </Link>
          <button
            type="submit"
            disabled={submit}
            className="text-white text-sm bg-primary-orange rounded-full px-5 py-1.5"
          >
            {submit ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
