import styles from './header.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { IMAGES, VECTORS } from '../../shared/ui'
import { useEffect, useState } from 'react'
import { RegModal } from '../modals/regModal'
import { UseMe } from '../../shared/hooks/api'
import { useUserContext } from '../../context'
import { LogModal } from '../modals/logModal'
import { RegSucModal } from '../modals/regSucModal'


export function Header() {
	const {token, setUser, user} = useUserContext()
	const {update, user: newUser} = UseMe()
	useEffect(() => {
			setInterval(() => {
			// console.log("WHY NOT", token, user	)
			if (!user){
				if (token){
					update(token)
				}
			}}, 1000)
		}, [token])
	useEffect(() => {
		if (!user){
			if (token){
				update(token)
				if (!newUser) {console.log("NO ID"); return}
				if ("id" in newUser) setUser(newUser)
				console.log("USER UPDATED")
			}
		}
	}, [newUser])
	function openReg(){
		console.log("what"); 
		setCurrentModalName('reg')
	}
	const navigate = useNavigate()
	const [currentModalName, setCurrentModalName] = useState("none")
	console.log(currentModalName)
	return (
		<header className={styles.header}>
			<nav className={styles.nav}>
				<Link to={"/catalog"} onClick={() => {window.scrollTo(0, 0)}}>КАТАЛОГ</Link>
				<Link to={"/about"} onClick={() => {window.scrollTo(0, 0)}}>ПРО НАС</Link>
				<Link to={"/contacts"} onClick={() => {window.scrollTo(0, 0)}}>КОНТАКТИ</Link>
			</nav>
			<div className={styles.logoBlock} onClick={() => {navigate('/'); window.scrollTo(0, 0)}} >
				<img src={IMAGES.logo} alt="Logo" />
			</div>
			<div className={styles.profileBlock}>
				<VECTORS.ShopVector className={styles.profileIcon} />
				<VECTORS.ProfilesVector className={styles.profileIcon} onClick = {() => {!token ? openReg() : navigate("cabinet")}} />
			</div>
			{currentModalName === "reg" ? <RegModal setCurrentModal = {setCurrentModalName}/>
			: currentModalName === "login" ? <LogModal setCurrentModal = {setCurrentModalName}/>
			: currentModalName === "reg-suc" ? <RegSucModal setCurrentModal = {setCurrentModalName}></RegSucModal>
			:  null}
		</header>
	)

}