"use client";

import { useParams, usePathname, useSearchParams } from "next/navigation";

function Page({ params }: { params: { slug: string } }) {
  const param2 = useParams();
  const address = usePathname();
  const testAddress = address //.split('/').pop()
  const querySearchParams = useSearchParams()

  
  console.log("usePathname", testAddress); // all the url
  console.log("useParams", param2); // the last (should be in dynamicRoute) 
  console.log("params", params); // like previous
  console.log("useSearchParams", querySearchParams); // after '?'
  return <div>l</div>;
}

export default Page;
