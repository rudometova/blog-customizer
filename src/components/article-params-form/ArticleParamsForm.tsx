import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	ArticleStateType,
	OptionType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	isOpen: boolean;
	onToggle: () => void;
	currentState: ArticleStateType;
	onApply: (state: ArticleStateType) => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	isOpen,
	onToggle,
	currentState,
	onApply,
	onReset,
}: ArticleParamsFormProps) => {
	const [formState, setFormState] = useState<ArticleStateType>(currentState);
	const sidebarRef = useRef<HTMLDivElement>(null);

	// Синхронизация с currentState
	useEffect(() => {
		setFormState(currentState);
	}, [currentState]);

	// Закрытие по клику вне сайдбара
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				isOpen &&
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node)
			) {
				onToggle();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen, onToggle]);

	// Обработчики изменений
	const handleFontFamilyChange = (selected: OptionType) => {
		setFormState({
			...formState,
			fontFamilyOption: selected,
		});
	};

	const handleFontSizeChange = (selected: OptionType) => {
		setFormState({
			...formState,
			fontSizeOption: selected,
		});
	};

	const handleFontColorChange = (selected: OptionType) => {
		setFormState({
			...formState,
			fontColor: selected,
		});
	};

	const handleBackgroundColorChange = (selected: OptionType) => {
		setFormState({
			...formState,
			backgroundColor: selected,
		});
	};

	const handleContentWidthChange = (selected: OptionType) => {
		setFormState({
			...formState,
			contentWidth: selected,
		});
	};

	const handleApply = (e: React.FormEvent) => {
		e.preventDefault();
		onApply(formState);
	};

	const handleReset = (e: React.FormEvent) => {
		e.preventDefault();
		onReset();
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={onToggle} />
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleApply}
					onReset={handleReset}>
					<div className={styles.formField}>
						<Select
							title='Шрифт'
							selected={formState.fontFamilyOption}
							options={fontFamilyOptions}
							onChange={handleFontFamilyChange}
							placeholder='Выберите шрифт'
						/>
					</div>

					<div className={styles.formField}>
						<RadioGroup
							title='Размер шрифта'
							name='fontSize'
							selected={formState.fontSizeOption}
							options={fontSizeOptions}
							onChange={handleFontSizeChange}
						/>
					</div>

					<div className={styles.formField}>
						<Select
							title='Цвет текста'
							selected={formState.fontColor}
							options={fontColors}
							onChange={handleFontColorChange}
							placeholder='Выберите цвет текста'
						/>
					</div>

					<div className={styles.formField}>
						<Select
							title='Цвет фона'
							selected={formState.backgroundColor}
							options={backgroundColors}
							onChange={handleBackgroundColorChange}
							placeholder='Выберите цвет фона'
						/>
					</div>

					<div className={styles.formField}>
						<Select
							title='Ширина контента'
							selected={formState.contentWidth}
							options={contentWidthArr}
							onChange={handleContentWidthChange}
							placeholder='Выберите ширину'
						/>
					</div>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
