import siteMetadata from '@/data/siteMetadata'
import projectsData from '@/data/projectsData'
import Card from '@/components/Card'
import { PageSEO } from '@/components/SEO'

export async function getStaticProps() {
  const data = await (
    await fetch(
      'https://api.github.com/search/repositories?q=user:laymonage&sort=stars&order=desc&per_page=6'
    )
  ).json()
  console.log(data)

  return {
    props: {
      data,
    },
  }
}

export default function Projects({ data }) {
  const numOfProjects = data.total_count
  const items = data.items

  return (
    <>
      <PageSEO title={`Projects - ${siteMetadata.author}`} description={siteMetadata.description} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Projects
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Showcase your projects with a hero image (16 x 9)
          </p>
        </div>
        <div className="container py-12">
          <div className="flex flex-wrap -m-4">
            {items.map((d) => (
              <Card
                key={d.name}
                title={d.name}
                description={d.description}
                imgSrc="/project.png"
                href={d.html_url}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
