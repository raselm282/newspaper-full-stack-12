import React, { useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { Controller, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";
import Select from "react-select";
import useArticlesById from "../Hooks/useArticlesById";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
console.log(image_hosting_key);
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const UpdateMyArticles = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article] = useArticlesById(id);
  console.log(article);
  const { _id, title, image, tags, description } = article;

  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const [publishers, setPublishers] = useState([]); // Dropdown options
  const [postedDate, setPostedDate] = useState(new Date());

  // Static tags for react-select
  const tagOptions = [
    { value: "Technology", label: "Technology" },
    { value: "Health", label: "Health" },
    { value: "Sports", label: "Sports" },
    { value: "Business", label: "Business" },
  ];
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
          title: data.title,
          image: res.data.data.display_url,
          tags: data.tags.map((tag) => tag.value),
          description: data.description,
        };

        const articlesRes = await axiosSecure.patch(
          `/articlesUpdateOne/${_id}`,
          articleData,
          {
            withCredentials: true,
          }
        );
        console.log(articlesRes.data);
        if (articlesRes.data.modifiedCount) {
          reset();
          navigate("/myArticles");
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${data.title} Update Article Successfully`,
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
        <title>Update Article</title>
      </Helmet>
      <h1>Add New Article</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-3">
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Title*</span>
            </label>
            <input
              className="input input-bordered w-full"
              type="text"
              defaultValue={title}
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && <p>{errors.title.message}</p>}
          </div>

          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Image*</span>
            </label>
            <input
              type="file"
              //   defaultValue={image}
              {...register("image", { required: "Image is required" })}
              accept="image/*"
            />
            {errors.image && <p>{errors.image.message}</p>}
          </div>
        </div>

        <div className="flex gap-3">
          {/* <div className="form-control w-full my-6">
        <label className="label"><span className="label-text">Publisher*</span></label>
          <select
            {...register("publisher")}
          >
            <option value="">Select Publisher</option>
            {publishers.map((pub) => (
              <option key={pub.value} value={pub.value}>
                {pub.label}
              </option>
            ))}
          </select>
          {errors.publisher && <p>{errors.publisher.message}</p>}
        </div> */}

          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Tags*</span>
            </label>
            <Controller
              name="tags"
              //   defaultValue={tags}
              control={control}
              rules={{ required: "At least one tag is required" }}
              render={({ field }) => (
                <Select isMulti options={tagOptions} {...field} />
              )}
            />
            {errors.tags && <p>{errors.tags.message}</p>}
          </div>
        </div>

        <div className="form-control w-full my-6">
          <label className="label">
            <span className="label-text">Description*</span>
          </label>
          <textarea
            className="input input-bordered w-full"
            defaultValue={description}
            {...register("description", {
              required: "Description is required",
            })}
          ></textarea>
          {errors.description && <p>{errors.description.message}</p>}
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

export default UpdateMyArticles;
