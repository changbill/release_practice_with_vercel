import { github_username } from "@/constant/constant"
import Link from "next/link"
import React from "react"
import { FaStar, FaCodeBranch, FaEye } from "react-icons/fa"

const username = github_username

async function fetchRepos() {
  const url = `https://api.github.com/users/${username}/repos`

  // 1. SSG : Static Site Generation
  // const response = await fetch(url)

  // 2. SSR : Server-Side Rendering
  // const response = await fetch(url, { cache: "no-store" })

  // 3. ISR : Incremental Static Regeneration
  const response = await fetch(url, { next: { revalidate: 60 } })

  await new Promise((resolve) => setTimeout(resolve, 1000))

  const repos = await response.json()
  return repos
}

const ReposPage = async () => {
  const repos = await fetchRepos()
  return (
    <div>
      <h2 className="text-4xl text-blue-600 font-bold mb-8">
        Repositories of {username}
      </h2>
      <ul>
        {repos.map((repo) => (
          <li key={repo.id} className="bg-gray-200 m-2 px-8 py-4 rounded-md">
            <Link href={`/repos/${repo.name}`}>
              <h3 className="text-xl font-bold">{repo.name}</h3>
              <p>{repo.description}</p>
              <div className="flex justify-between items-center">
                <span className="span-item">
                  <FaStar /> {repo.stargazers_count}
                </span>
                <span className="flex items-center gap-1">
                  <FaCodeBranch /> {repo.forks_count}
                </span>
                <span className="flex items-center gap-1">
                  <FaEye /> {repo.watchers_count}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ReposPage
