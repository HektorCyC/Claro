import { Injectable } from '@angular/core';

import { firebase } from '@firebase/app';
import { auth } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap, startWith, tap, filter } from 'rxjs/operators';

interface User {
	uid: string;
	email?: string | null;
	displayName?: string;
}

@Injectable()
export class AuthService {
	user: Observable<User | null>;

	constructor(
		private afAuth: AngularFireAuth,
		private afs: AngularFirestore,
	) {
		this.user = this.afAuth.authState.pipe(
			switchMap(user => {
				if (user) {
					return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
				} else {
					return of(null);
				}
			})
		);
	}

	//////Login Methods /////

	googleLogin() {
		const provider = new auth.GoogleAuthProvider();
		return this.oAuthLogin(provider);
	}

	facebookLogin() {
		const provider = new auth.FacebookAuthProvider();
		return this.oAuthLogin(provider);
	}


	private oAuthLogin(provider: any) {
		return this.afAuth.auth
			.signInWithPopup(provider)
			.then(credential => {
				return this.updateUserData(credential.user);
			})
			.catch(error => this.handleError(error));
	}

	// Send email to reset passwrod
	resetPassword(email: string) {
		const fbAuth = auth();

		return fbAuth
			.sendPasswordResetEmail(email)
			.catch(error => this.handleError(error));
	}

	signOut() {
		this.afAuth.auth.signOut().then(() => {
			console.error('Loged out');
		});
	}

	// Catch errors
	private handleError(error: Error) {
		console.error(error);
	}

	// Save data in firestore
	private updateUserData(user: User) {
		const userRef: AngularFirestoreDocument<User> = this.afs.doc(
			`users/${user.uid}`
		);

		const data: User = {
			uid: user.uid,
			email: user.email || null,
			displayName: user.displayName || 'Sin nombre',
		};
		return userRef.set(data);
	}
}