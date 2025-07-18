import { User } from "@/types/user";
import Link from "next/link";

type Props = {
    params: { id: string };
};

export default async function Page({ params }: Props) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`);

    if (!res.ok) {
        return <div>ユーザーが見つかりませんでした。</div>
    }

    const user: User = await res.json();

    return (
        <>
            <div>
                <h2>{user.name}の詳細</h2>
                <p><strong>username:</strong> {user.username}</p>
                <p><strong>email:</strong> {user.email}</p>
                <p><strong>phone:</strong> {user.phone}</p>
                <p><strong>website:</strong> {user.website}</p>
                <h3>Address</h3>
                <p><strong>street:</strong> {user.address.street}</p>
                <p><strong>suite:</strong> {user.address.suite}</p>
                <p><strong>city:</strong> {user.address.city}</p>
                <p><strong>zipcode:</strong> {user.address.zipcode}</p>
                <p><strong>Geo/lat:</strong> {user.address.geo.lat}</p>
                <p><strong>Geo/lng:</strong> {user.address.geo.lng}</p>
                <h3>Company</h3>
                <p><strong>name:</strong> {user.company.name}</p>
                <p><strong>catchPhrase:</strong> {user.company.catchPhrase}</p>
                <p><strong>bs:</strong> {user.company.bs}</p>
            </div>
            <div >
                <Link href="/app3">戻る</Link>
            </div >
        </>
    )
}