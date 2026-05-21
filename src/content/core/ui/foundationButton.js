/**
 * createFoundationButton
 *
 * Creates a Roblox Foundation button
 *
 * colorVariant: 'standard' (default) | 'emphasis'
 * sizeVariant:  'standard' (default) | 'large'
 *
 * @example
 * createFoundationButton({ content: 'text here' });
 * createFoundationButton({ content: 'text here', colorVariant: 'emphasis' });
 * createFoundationButton({ content: 'text here', sizeVariant: 'large' });
 * createFoundationButton({ content: 'text here', colorVariant: 'emphasis', sizeVariant: 'large' });
 *
 * Done by boiby, based off the square button in ui/profile
 *
 */
export function createFoundationButton({
    content,
    id,
    backgroundColor,
    textColor,
    hoverBackgroundColor,
    pressBackgroundColor,
    onClick,
    disabled = false,
    width = '100%',
    height,
    paddingX = 'padding-x-medium',
    paddingY = 'padding-y-none',
    disableTextTruncation = false,
    radius = 'radius-medium',
    fontSize,
    colorVariant,
    sizeVariant,
}) {
    const resolvedHeight =
        sizeVariant === 'large'    ? 'height-1200' :
        sizeVariant === 'standard' ? 'height-1000' :
        height ?? 'height-1000';

    const colorClasses =
        colorVariant === 'emphasis'
            ? 'bg-action-emphasis content-action-emphasis'
            : 'bg-action-standard content-action-standard';

    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('aria-disabled', String(disabled));
    if (id) button.id = id;

    button.className = [
        'foundation-web-button relative clip group/interactable',
        'focus-visible:outline-focus disabled:outline-none',
        'cursor-pointer flex items-center justify-center',
        'stroke-none select-none text-label-medium',
        resolvedHeight,
        paddingX,
        paddingY,
        radius,
        colorClasses,
    ].join(' ');

    Object.assign(button.style, {
        textDecoration: 'none',
        width,
        backgroundColor: backgroundColor || '',
        fontSize: fontSize || '',
        color: textColor || '',
    });

    button.disabled = disabled;

    const presentationDiv = document.createElement('div');
    presentationDiv.setAttribute('role', 'presentation');

    let presentationDivClass = 'absolute inset-[0] transition-colors';
    presentationDivClass += hoverBackgroundColor
        ? ` group-hover/interactable:bg-[${hoverBackgroundColor}]`
        : ' group-hover/interactable:bg-[var(--color-state-hover)]';
    presentationDivClass += pressBackgroundColor
        ? ` group-active/interactable:bg-[${pressBackgroundColor}]`
        : ' group-active/interactable:bg-[var(--color-state-press)]';
    presentationDivClass += ' group-disabled/interactable:bg-none';
    presentationDiv.className = presentationDivClass;

    const contentSpan = document.createElement('span');
    contentSpan.className = [
        'padding-y-xsmall padding-x-xsmall',
        disableTextTruncation ? 'text-no-wrap' : 'text-truncate-end text-no-wrap',
    ].join(' ');

    if (Array.isArray(content)) {
        content.forEach((item) => {
            if (typeof item === 'string') {
                contentSpan.appendChild(document.createTextNode(item));
            } else if (item instanceof Element) {
                contentSpan.appendChild(item);
            }
        });
    } else if (typeof content === 'string') {
        contentSpan.textContent = content;
    } else if (content instanceof Element) {
        contentSpan.appendChild(content);
    }

    button.append(presentationDiv, contentSpan);

    if (onClick) {
        button.addEventListener('click', onClick);
    }

    return button;
}
