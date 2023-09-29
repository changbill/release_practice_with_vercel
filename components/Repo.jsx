import { github_username } from "@/constant/constant"
import Link from "next/link"
import React from "react"
import { FaCodeBranch, FaEye, FaStar } from "react-icons/fa"

const username = github_username

async function fetchRepo(name) {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const url = `https://api.github.com/repos/${username}/${name}`
  const response = await fetch(url)
  const repo = await response.json()
  return repo
}

const Repo = async ({ name }) => {
  const repo = await fetchRepo(name)

  return (
    <div>
      <h3 className="text-xl font-bold">
        <Link href={`https://github.com/${username}/${name}`}>{repo.name}</Link>
      </h3>
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
    </div>
  )
}

export default Repo
