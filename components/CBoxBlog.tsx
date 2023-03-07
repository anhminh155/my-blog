import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

type CBoxBlogProps = {
  author: any;
  date: string;
  title: string;
  description: string;
  tags: string[];
  url: string | any;
};

function CBoxBlog({
  date,
  title,
  description,
  tags,
  author,
  url,
}: CBoxBlogProps) {
  const previewText: string = description.substring(0, 200) + "...";
  const router = useRouter();
  const formatDate = new Date(date);
  const options:any = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  return (
    <div className="box bg-white rounded-xl p-4">
      <div className="box-content">
        <div className="flex gap-2">
          <a href={author.url} target="_blank">
            <img
              src={author.avatar}
              className="h-10 w-10 rounded-full"
              alt=""
            />
          </a>
          <div className="flex flex-col text-[#667085] text-sm">
            <a href={author.url} target="_blank">
              {author.name}
            </a>
            <span className="date pb-2">
              {new Date(formatDate).toLocaleDateString('en-US',options)}
            </span>
          </div>
        </div>

        <h2
          onClick={() => router.push(`${url}`)}
          className="title text-[#1D2939] text-2xl pb-2 cursor-pointer"
        >
          {title}
        </h2>
        <div className="description text-[#475467] text-lg">{previewText}</div>
        <div className="tag mt-2">
          {tags.map((tag: string, index: number) => {
            return (
              <span key={index} className=" p-1 bg-blue-300 mr-1 rounded-lg">
                {tag}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CBoxBlog;
