import GObject from "gi://GObject"
import { Gtk, astalify, type ConstructProps } from "astal/gtk4"

export const FlowBox = astalify(Gtk.FlowBox, {
    // getChildren(self) {
    //     return [];
    // },
    
    // setChildren(self, children) {
       
        // let elementChild = []
        // const button1 = new Gtk.Button({ label: "Button 1" });
        // const button2 = new Gtk.Button({ label: "Button 2" });

        

    //     print(children);
        
        
    //     children.forEach(element => {
    //         elementChild.push(element)
    //     });
        
    //     print(elementChild);
    //     // self.append(children)
    // }
})


export const GtkGrid = (props) => {
    const { maxPerRow = 8 } = props;
  
    const Grid = astalify(Gtk.Grid, {
      setChildren(self, children) {
        children.forEach((element, index) => {
          const col = index % maxPerRow;
          const row = Math.floor(index / maxPerRow);
          self.attach(element, col, row, 1, 1);
        });
      }
    });
  
    return (
      <Grid {...props}>
      </Grid>
    );
  };


  
// export const GtkCheckButton = astalify(Gtk.CheckButton)

// export const GtkCheckButton = astalify(Gtk.CheckButton, {
//   setProps(self, props) {
//     if (props.onToggled) {
//       self.connect("toggled", () => props.onToggled?.(self))
//     }
//   }
// })


// type Props = {
//   onToggled?: (self: Gtk.CheckButton) => void
// }

// export const GtkCheckButton = astalify<Gtk.CheckButton, Props>(Gtk.CheckButton, {
//   setProps(self, props) {
//     if (props.onToggled) {
//       self.connect("toggled", () => props.onToggled?.(self))
//     }
//   }
// })

export const GtkCheckButton = astalify(Gtk.CheckButton);

export const GtkDrawingArea = astalify(Gtk.DrawingArea);

export const GtkLinkButton = astalify(Gtk.LinkButton);

export const GtkToggleButton = astalify(Gtk.ToggleButton);

export const GtkDropDown = astalify(Gtk.DropDown);

export const GtkSpinButton = astalify(Gtk.SpinButton);

export const GtkSpinner = astalify(Gtk.Spinner);





// type GridProps = Gtk.Grid.ConstructorProps & {
//   maxPerRow?: number;
// };

// let latestMaxPerRow = 1;

// export const Grid = astalify<Gtk.Grid, GridProps>(Gtk.Grid, {
//   props: ['maxPerRow'],

//   setProps(self, props) {
//     latestMaxPerRow = props.maxPerRow ?? 1;
//   },
//   setChildren(self, children) {
//     children.forEach((element, index) => {
//       const col = index % latestMaxPerRow;
//       const row = Math.floor(index / latestMaxPerRow);
//       self.attach(element, col, row, 1, 1);
//     });
//   }
// });
