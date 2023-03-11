import { Link, useLoaderData, useRevalidator } from "@remix-run/react";
import { json } from "@remix-run/node";
import Stories from "~/components/Stories/Stories";
import * as storyService from "~/services/storyService";

import shared from '~/styles/shared.css'
import refreshIcon from '~/assets/refresh.png'
import logo from '~/assets/y18.png'

import type { IStory } from "~/types/IStory";
import { useRefetch } from "~/hooks/useRefetch";

const RefetchTimeout = 60;

export default function Index() {
  const stories = useLoaderData<IStory[]>();
  const { revalidate } = useRevalidator();

  useRefetch(revalidate, RefetchTimeout)

  return (
      <>
        <header className="header">
          <img className="header__logo" src={logo} alt="" />
          <h1 className="header__title">Hacker News</h1>
          <button onClick={revalidate} className="header__refresh-button"><img src={refreshIcon} alt="" className="header__refresh" /></button>
        </header>
        <Stories stories={stories} />
        <Link to="/posts/124">go</Link>
      </>
  );
}

export async function loader() {
  const stories = await storyService.fetchLastStories({ limit: 100 });

  let headers = { "Cache-Control": `max-age=${RefetchTimeout}` }
  return json(stories, { headers })
}

export function links() {
  return [
    {rel: 'stylesheet', href: shared},
  ];
}

