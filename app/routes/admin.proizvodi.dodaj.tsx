import { Form } from '@remix-run/react';
import PageTitle from './admin/components/page-title';
import { Label } from '~/components/ui/label';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';
import { Button } from '~/components/ui/button';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '~/components/ui/select';

export default function CreateProductPage() {
	return (
		<>
			<PageTitle title="Postavi proizvod" />
			<section className="mt-8 text-muted-foreground">
				<Form className="mx-auto grid max-w-2xl grid-cols-[auto_1fr] items-center gap-3">
					<Label htmlFor="product-name">Naziv proizvda:</Label>
					<Input type="text" name="product-name" />

					<Label htmlFor="sku">ID proizvoda/SKU:</Label>
					<Input type="text" name="sku" />

					<Label htmlFor="category">Kategorija:</Label>
					<Select name="category">
						<SelectTrigger>
							<SelectValue placeholder="Izaberi kategoriju" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Kategorije</SelectLabel>
								<SelectItem value="tools">Alati</SelectItem>
								<SelectItem value="electrical">Električni</SelectItem>
								<SelectItem value="plumbing">Vodovodni</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>

					<Label htmlFor="price">Cena:</Label>
					<Input type="number" name="price" step="0.01" />
					<Label htmlFor="cost-price">Nabavna Cena:</Label>
					<Input type="number" name="cost-price" step="0.01" />

					<Label htmlFor="quantity">Količina na zalihi:</Label>
					<Input type="number" name="quantity" />

					<Label htmlFor="description" className="">
						Opis proizvoda:
					</Label>
					<Textarea name="description"></Textarea>

					<Label htmlFor="manufacturer">Proizvođač/Brend:</Label>
					<Input type="text" name="manufacturer" />

					<Label htmlFor="product-image">Slika proizvoda:</Label>
					<Input type="file" name="product-image" accept="image/*" />

					<Label htmlFor="dimensions">Dimenzije:</Label>
					<Input type="text" name="dimensions" />

					<Label htmlFor="weight">Težina:</Label>
					<Input type="text" name="weight" />

					<Label htmlFor="color">Boja/Završna obrada:</Label>
					<Input type="text" name="color" />

					<Label htmlFor="material">Materijal:</Label>
					<Input type="text" name="material" />

					<Label htmlFor="warranty">Informacije o garanciji:</Label>
					<Textarea name="warranty"></Textarea>

					<Label htmlFor="shipping-info">Informacije o dostavi:</Label>
					<Textarea name="shipping-info"></Textarea>

					<Label htmlFor="tags">Oznake/Ključne reči:</Label>
					<Input type="text" name="tags" />

					<Label htmlFor="availability">Dostupnost:</Label>
					<Select name="availability">
						<SelectTrigger>
							<SelectValue placeholder="Izaberi opciju" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="in-stock">Na stanju</SelectItem>
							<SelectItem value="out-of-stock">Nema na stanju</SelectItem>
							<SelectItem value="pre-order">Preorder</SelectItem>
						</SelectContent>
					</Select>

					<Label htmlFor="safety-info">Informacije o bezbednosti:</Label>
					<Textarea name="safety-info"></Textarea>

					<Label htmlFor="user-manual">Korisnički priručnik/Uputstvo:</Label>
					<Input type="file" name="user-manual" />

					<div className="col-span-full text-right">
						<Button type="submit">Dodaj proizvod</Button>
					</div>
				</Form>
			</section>
		</>
	);
}
