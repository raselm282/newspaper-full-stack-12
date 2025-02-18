import React, { useState } from "react";
// import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { Controller, useForm } from "react-hook-form";
// import Select from "react-select/base";
import Select from "react-select";
// import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
// console.log(image_hosting_key);
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const AddArticles = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const axiosPublic = useAxiosPublic();
  // const axiosSecure = useAxiosSecure();
  const { data: publishers } = useQuery({
    queryKey: ["publishers"],
    queryFn: async () => {
      const { data } = await axiosPublic(`/publishersData`);
      return data;
    },
  });

  const [postedDate, setPostedDate] = useState(new Date());
  // Static tags for react-select
  const tagOptions = [
    { value: "Technology", label: "Technology" },
    { value: "Health", label: "Health" },
    { value: "Sports", label: "Sports" },
    { value: "Business", label: "Business" },
  ];
  const onSubmit = async (data) => {
    // console.log(data);
    // console.log(data.publisher);

    const formData = new FormData();
    formData.append("image", data.image[0]);

    try {
      const res = await axiosPublic.post(image_hosting_api, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      // console.log(res.data);
      if (res.data.success) {
        const articleData = {
          title: data.title,
          image: res.data.data.display_url,
          tags: data.tags.map((tag) => tag.value),
          description: data.description,
          views: 0,
          reason: null,
          isPremium: false,
          postedDate,
          publishers: data.publisher,
          buyer: {
            email: user?.email,
            name: user?.displayName,
            photo: user?.photoURL,
          },
          status: "pending",
        };

        const articlesRes = await axiosPublic.post(
          "/articlesPost",
          articleData
        );
        // console.log(articlesRes.data);
        if (articlesRes.data.insertedId) {
          reset();
          toast.success(`${data.title} Add Successfully`);

          navigate("/myArticles");
        }
      }
    } catch (error) {
      console.error("error", error);
    }
  };
  //   const onSubmit = async (data) => {

  //     console.log(data);
  //     // image upload to imgbb and then get an url
  //     const imageFile = { image: data.image[0] };
  //     const res = await axiosPublic.post(image_hosting_api, imageFile, {
  //       headers: {
  //         "content-type": "multipart/form-data",
  //       },
  //     });
  //     console.log(res.data);
  //     if (res.data.success) {
  //         if (!data.image[0] || !data.image[0].type.startsWith("image/")) {
  //             alert("একটি বৈধ ইমেজ ফাইল আপলোড করুন।");
  //             return;
  //           }
  //       // now send the menu item data to the server with the image url
  //       const articleData = {
  //         title: data.title,
  //         image: res.data.data.display_url,
  //         // publisher: data.publisher,
  //         tags: data.tags.map((tag) => tag.value),
  //         description: data.description,
  //         status: "pending", // Set initial status as pending
  //       };
  //       //
  //       const articlesRes = await axiosSecure.post("/articles", articleData);
  //       console.log(articlesRes.data);
  //       if (articlesRes.data.insertedId) {
  //         // show success popup
  //         reset();
  //         Swal.fire({
  //           position: "top-end",
  //           icon: "success",
  //           title: `${data.name} is added to the menu.`,
  //           showConfirmButton: false,
  //           timer: 1500,
  //         });
  //       }
  //     }
  //     console.log("with image url", res.data);
  //   };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg dark:bg-gray-900 dark:text-white/60">
      <Helmet>
        <title>Add Articles</title>
      </Helmet>
      <h1>Add New Article</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-3">
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text dark:text-white/60">Title*</span>
            </label>
            <input
              className="input input-bordered w-full dark:border dark:border-white/60 dark:bg-gray-900 dark:text-white/60"
              type="text"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && <p>{errors.title.message}</p>}
          </div>

          <div className="form-control w-full my-6">
            <label className="label dark:text-white/60">
              <span className="label-text dark:text-white/60">Image*</span>
            </label>
            <input
              className="dark:bg-gray-900 dark:text-white/60 dark:border dark:border-white/60"
              type="file"
              {...register("image", { required: "Image is required" })}
              accept="image/*"
            />
            {errors.image && <p>{errors.image.message}</p>}
          </div>
        </div>

        <div className="flex gap-3">
          {publishers && (
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text dark:text-white/60">
                  Publisher*
                </span>
              </label>
              <select
                className="input input-bordered w-full dark:bg-gray-900 dark:text-white/60 dark:border dark:border-white/60"
                {...register("publisher")}
              >
                <option value="">Select Publisher</option>
                {publishers.map((pub) => (
                  <option
                    className="dark:bg-gray-900 dark:text-white/60"
                    key={pub._id}
                    value={pub.publisher}
                  >
                    {pub.publisher}
                  </option>
                ))}
              </select>
              {errors.publisher && <p>{errors.publisher.message}</p>}
            </div>
          )}

          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text dark:text-white/60">Tags*</span>
            </label>
            <Controller
              name="tags"
              control={control}
              rules={{ required: "At least one tag is required" }}
              render={({ field }) => (
                // <Select className="dark:bg-gray-900 dark:text-white/60 dark:border dark:border-white/60" isMulti options={tagOptions} {...field} />
                <Select
                  {...field}
                  isMulti
                  options={tagOptions}
                  className="dark:text-white"
                  styles={{
                    control: (base, state) => ({
                      ...base,
                      backgroundColor: state.isFocused ? "#374151" : "#1f2937", // Dark background
                      borderColor: state.isFocused ? "#4b5563" : "#374151", // Gray border
                      color: "white",
                      boxShadow: state.isFocused ? "0 0 0 1px #4b5563" : "none",
                    }),
                    menu: (base) => ({
                      ...base,
                      backgroundColor: "#1f2937", // Dark dropdown background
                      color: "white",
                    }),
                    option: (base, { isFocused }) => ({
                      ...base,
                      backgroundColor: isFocused ? "#374151" : "#1f2937",
                      color: "white",
                      cursor: "pointer",
                    }),
                    multiValue: (base) => ({
                      ...base,
                      backgroundColor: "#4b5563", // Tag background
                      color: "white",
                    }),
                    multiValueLabel: (base) => ({
                      ...base,
                      color: "white",
                    }),
                    multiValueRemove: (base) => ({
                      ...base,
                      color: "white",
                      ":hover": {
                        backgroundColor: "#991b1b", // Red hover for remove button
                        color: "white",
                      },
                    }),
                  }}
                />
              )}
            />
            {errors.tags && <p>{errors.tags.message}</p>}
          </div>
        </div>

        <div className="form-control w-full my-6">
          <label className="label">
            <span className="label-text dark:text-white/60">Description*</span>
          </label>
          <textarea
            className="input input-bordered w-full dark:border dark:border-white/60 dark:bg-gray-900 dark:text-white/60"
            {...register("description", {
              required: "Description is required",
            })}
          ></textarea>
          {errors.description && <p>{errors.description.message}</p>}
        </div>

        <div className="py-4 text-center">
          <button className="btn bg-yellow-500 dark:bg-yellow-500/70 hover:bg-yellow-600" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddArticles;
