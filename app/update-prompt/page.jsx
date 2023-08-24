"use client";

import { useEffect, useState } from "react";
import Form from "@components/Form";
import { useRouter, useSearchParams } from "next/navigation";

const EditPrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const [submit, setSubmit] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const getPromptDetails = async () => {
    const response = await fetch(`/api/prompt/${promptId}`);
    const data = await response.json();
    console.log(data);
    setPost({
      prompt: data.prompt,
      tag: data.tag,
    });
  };
  useEffect(() => {
    if (promptId) getPromptDetails();
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmit(true);

    if (!promptId) return alert("Prompt ID not found");

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmit(false);
    }
  };
  console.log(post);
  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submit={submit}
      handleSubmit={updatePrompt}
    />
  );
};

export default EditPrompt;
