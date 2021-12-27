function generatePDF() {
          // Choose the element that our invoice is rendered in.
          const element = document.getElementById('invoice');
          //
          var opt = {
          margin:       [0.4,0.4,0.1,0],
          filename:     'Invoice-PDF.pdf',
          jsPDF:        { unit: 'cm', format: 'letter', orientation: 'portrait' },
          
        };

        

        // New Promise-based usage:
          html2pdf().set(opt).from(element).save();

          
          
      }

      function getFinal(){
        
        var tq=document.getElementById("q1").value;
        var tp=document.getElementById("p1").value;
        document.getElementById("a1").value=0;
        if(tp != undefined && tq!=undefined) document.getElementById("a1").value=tp*tq;
        var grand_total=tp*tq;

        tq=document.getElementById("q2").value , tp=document.getElementById("p2").value , document.getElementById("a2").value=0;
        if(tp != undefined && tq!=undefined) document.getElementById("a2").value=tp*tq , grand_total+=tp*tq;

        tq=document.getElementById("q3").value , tp=document.getElementById("p3").value , document.getElementById("a3").value=0;
        if(tp != undefined && tq!=undefined) document.getElementById("a3").value=tp*tq , grand_total+=tp*tq;

        tq=document.getElementById("q4").value , tp=document.getElementById("p4").value , document.getElementById("a4").value=0;
        if(tp != undefined && tq!=undefined) document.getElementById("a4").value=tp*tq , grand_total+=tp*tq;

        tq=document.getElementById("q5").value , tp=document.getElementById("p5").value , document.getElementById("a5").value=0;
        if(tp != undefined && tq!=undefined) document.getElementById("a5").value=tp*tq , grand_total+=tp*tq;

        tq=document.getElementById("q6").value , tp=document.getElementById("p6").value , document.getElementById("a6").value=0;
        if(tp != undefined && tq!=undefined) document.getElementById("a6").value=tp*tq , grand_total+=tp*tq;

        tq=document.getElementById("q7").value , tp=document.getElementById("p7").value , document.getElementById("a7").value=0;
        if(tp != undefined && tq!=undefined) document.getElementById("a7").value=tp*tq , grand_total+=tp*tq;

        tq=document.getElementById("q8").value , tp=document.getElementById("p8").value , document.getElementById("a8").value=0;
        if(tp != undefined && tq!=undefined) document.getElementById("a8").value=tp*tq , grand_total+=tp*tq;

        tq=document.getElementById("q9").value , tp=document.getElementById("p9").value , document.getElementById("a9").value=0;
        if(tp != undefined && tq!=undefined) document.getElementById("a9").value=tp*tq , grand_total+=tp*tq;

        tq=document.getElementById("q10").value , tp=document.getElementById("p10").value , document.getElementById("a10").value=0;
        if(tp != undefined && tq!=undefined) document.getElementById("a10").value=tp*tq , grand_total+=tp*tq;

        tq=document.getElementById("q11").value , tp=document.getElementById("p11").value , document.getElementById("a11").value=0;
        if(tp != undefined && tq!=undefined) document.getElementById("a11").value=tp*tq , grand_total+=tp*tq;

        tq=document.getElementById("q12").value , tp=document.getElementById("p12").value , document.getElementById("a12").value=0;
        if(tp != undefined && tq!=undefined) document.getElementById("a12").value=tp*tq , grand_total+=tp*tq;

        tq=document.getElementById("q13").value , tp=document.getElementById("p13").value , document.getElementById("a13").value=0;
        if(tp != undefined && tq!=undefined) document.getElementById("a13").value=tp*tq , grand_total+=tp*tq;

        tq=document.getElementById("q14").value , tp=document.getElementById("p14").value , document.getElementById("a14").value=0;
        if(tp != undefined && tq!=undefined) document.getElementById("a14").value=tp*tq , grand_total+=tp*tq;

        tq=document.getElementById("q15").value , tp=document.getElementById("p15").value , document.getElementById("a15").value=0;
        if(tp != undefined && tq!=undefined) document.getElementById("a15").value=tp*tq , grand_total+=tp*tq;


        var d=parseInt(document.getElementById("disc").value );
        document.getElementById("total").innerHTML="Total : "+ grand_total ;

       
        
        var gt = grand_total - parseFloat(d * parseFloat(0.01) * grand_total);
        console.log(grand_total);
        document.getElementById("gtotal").innerHTML="Grand Total : "+ gt ;
        
        document.getElementById("greeding").innerHTML="THANK YOU FOR YOUR BUSINESS!";
        document.getElementById("nvg").style.height="693px";
        document.getElementById("icn").style.height="683px";

      }