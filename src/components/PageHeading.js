import { Typography } from "@material-tailwind/react"
export default function PageHeading({ title, action }) {
  title = title ?? ''
  return (
    <div className="flex justify-between items-center">
      <Typography color="green" variant="h3" className="text-left mb-8">
        { title }
      </Typography>
      { action && action }
    </div>
  )
}