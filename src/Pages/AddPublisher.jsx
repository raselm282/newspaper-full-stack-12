import React from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
console.log(image_hosting_key);
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddPublisher = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    const formData = new FormData();
    formData.append("image", data.image[0]);

    try {
      const res = await axiosPublic.post(image_hosting_api, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        const articleData = {
          publisher: data.publisher,
          image: res.data.data.display_url,
        };

        const articlesRes = await axiosSecure.post(
          "/addPublisher",
          articleData,
          {
            withCredentials: true,
          }
        );

        if (articlesRes.data.insertedId) {
          reset();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${data.publisher} Add Publisher Successfully`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    } catch (error) {
      console.error("error", error);
    }
  };
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <Helmet>
        <title>Dashboard || Add Publishers</title>
      </Helmet>
      <h1>Add New Article</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-3">
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Add Publisher*</span>
            </label>
            <input
              className="input input-bordered w-full"
              type="text"
              {...register("publisher", { required: "Publisher is required" })}
            />
            {errors.publisher && <p>{errors.publisher.message}</p>}
          </div>

          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Image logo*</span>
            </label>
            <input
              type="file"
              {...register("image", { required: "Image is required" })}
              accept="image/*"
            />
            {errors.image && <p>{errors.image.message}</p>}
          </div>
        </div>

        <div className="py-4 text-center">
          <button className="btn btn-warning" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPublisher;
