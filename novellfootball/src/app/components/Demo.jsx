"use client"

import { useRouter, usePathname, useSearchParams } from 'next/navigation'


function Demo() {
  const router = useRouter();

  const currentPath = router.pathname;
  console.log(currentPath);
 
  return (
    <button onClick={() => router.push('/')}>
      Click here to read more
    </button>
  )
}

export default Demo;
