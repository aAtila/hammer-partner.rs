export default function FormErrors({ errors }: { errors?: any }) {
	if (!errors) return null;

	return (
		<div className="mx-auto max-w-2xl rounded bg-red-400/20 p-5">
			<ul className="list-inside list-disc text-red-500">
				{Object.entries(errors).map(([key, value]) => (
					<li key={key}>{value[0]}</li>
				))}
			</ul>
		</div>
	);
}
