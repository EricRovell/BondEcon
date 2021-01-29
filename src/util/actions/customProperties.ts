type Props = Record<string, string>;

/**
 * Action for reactive setting the custom css properties from object.
 */
export default function customProperties(node: HTMLElement, props: Props = {}) {
  let currentProps = props;
  
	update(props);
  
	function update(props: Props) {
		Object.keys(currentProps).forEach(property => {
      node.style.removeProperty(`--${property}`)
    });
    
		Object.entries(props).forEach(([ property, value ]) => {
      node.style.setProperty(`--${property}`, value);
    });

		currentProps = props;
	}
	
	return {
		update,
		destroy: () => update({})
	}
}