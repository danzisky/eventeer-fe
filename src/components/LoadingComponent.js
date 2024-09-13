import { Typography } from "@material-tailwind/react"
export default function PageHeading({ title }) {
  title = title ?? 'Loading...'
  return (
    <div className="h-full w-full flex justify-center items-center text-center">
      <Typography variant="h4" className="">
        { title }
      </Typography>
    </div>
  )
}