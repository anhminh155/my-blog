import { getBlogDetail } from "@/server/blogs";
import {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
import Head from "next/head";
import React from "react";
import parse from "html-react-parser";
import detail from "./id.module.css";
import { useRouter } from "next/router";

const BlogPost: NextPage = ({
  blogData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { author, bodyHTML, createdAt, title } = blogData;
  const router = useRouter();
  const formatDate = new Date(createdAt);
  const options: any = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  return (
    <>
      <Head>
        <title>My blog | {title}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="main bg-[#F2F4F7] h-full">
        <div className="absolute top-4 left-2">
          <span onClick={()=> router.back()} className="rounded-lg bg-slate-500 text-white px-2 py-1 cursor-pointer hover:bg-slate-400">
            Back
          </span>
        </div>
        <div className="banner bg-white w-screen flex justify-center flex-col items-center py-9">
          <h1 className="text-center text-transparent text-4xl bg-clip-text bg-gradient-to-r from-[#C41740] to-[#EA9C28] py-4">
            {title}
          </h1>
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
                {new Date(formatDate).toLocaleDateString("en-US", options)}
              </span>
            </div>
          </div>
          {/* <p className="max-w-2xl text-2xl text-center">
            Full-stack Blog Project with Next.js, TypeScript, TailwindCSS,
            Github GraphQL
          </p> */}
        </div>
        <div className="list-blog max-w-7xl py-4 mx-5 xl:mx-auto">
          <div className={`${detail.html}`}>{parse(bodyHTML)}</div>
        </div>
      </div>
    </>
  );
};
export default BlogPost;

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const route: string[] | string | undefined = ctx.query.id;
  const id = Number(route);

  let blogDetail = await getBlogDetail(id);

  return {
    props: {
      blogData: blogDetail,
    },
  };
};