import { json, type ActionFunctionArgs, redirect } from '@remix-run/node';
import { Input } from '~/components/ui/input';
import { z } from 'zod';
import {
	Form,
	useActionData,
	useNavigation,
	useSearchParams,
} from '@remix-run/react';
import SubmitButton from '~/components/form/submit-button';
import { authCookie, loginUser } from '~/auth';
import { Label } from '~/components/ui/label';

const schema = z.object({
	email: z.string().min(5, 'Email je obavezan').email('Email nije validan'),
	password: z
		.string()
		.min(1, 'Lozinka je obavezna')
		.min(5, 'Lozinka je prekratka'),
});

export const action = async ({ request }: ActionFunctionArgs) => {
	const formData = await request.formData();
	const data = Object.fromEntries(formData);
	const redirectTo = data.next ? String(data.next) : '/admin';

	const validated = schema.safeParse(data);

	if (!validated.success) {
		return json({ errors: validated.error.flatten().fieldErrors } as const);
	}

	const user = loginUser(validated.data.email, validated.data.password);
	if (user)
		return redirect(redirectTo, {
			headers: { 'Set-Cookie': await authCookie.serialize(user.email) },
		});
};

export default function SignInPage() {
	const [searchParams] = useSearchParams();
	const data = useActionData<typeof action>();
	const navigation = useNavigation();
	const isActionSubmission = navigation.state === 'submitting';
	const next = searchParams.get('next') || undefined;

	return (
		<section className="prose mx-auto flex h-full max-w-md flex-col items-center justify-center">
			<div className="w-full rounded-lg bg-white p-6 pt-16 text-center shadow-xl">
				<h1>Prijavi se</h1>
				<Form className="mt-16 w-full" method="post" noValidate>
					<fieldset disabled={isActionSubmission} className="group grid gap-3">
						<div className="space-y-1.5">
							<div className="flex justify-between">
								<Label htmlFor="email">Email</Label>
								{data &&
								'errors' in data &&
								'email' in data.errors &&
								data.errors.email ? (
									<small className="text-xs font-medium text-destructive">
										{data.errors.email[0]}
									</small>
								) : null}
							</div>
							<Input name="email" type="email" required />
						</div>
						<div className="space-y-1.5">
							<div className="flex justify-between">
								<Label htmlFor="email">Lozinka</Label>
								{data &&
								'errors' in data &&
								'password' in data.errors &&
								data.errors.password ? (
									<small className="text-xs font-medium text-destructive">
										{data.errors.password[0]}
									</small>
								) : null}
							</div>
							<Input name="password" type="password" required />
						</div>
						<input
							name="next"
							type="text"
							hidden
							readOnly
							defaultValue={next}
						/>
						<SubmitButton label="Prijavi se" />
					</fieldset>
				</Form>
			</div>
		</section>
	);
}
