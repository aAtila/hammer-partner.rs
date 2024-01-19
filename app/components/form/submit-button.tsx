import { RotateCwIcon } from 'lucide-react';
import { Button } from '../ui/button';

export default function SubmitButton({ label }: { label: string }) {
	return (
		<Button type="submit" className="flex">
			<RotateCwIcon className="absolute size-6 animate-spin group-enabled:opacity-0" />
			<span className="group-disabled:opacity-0">{label}</span>
		</Button>
	);
}
